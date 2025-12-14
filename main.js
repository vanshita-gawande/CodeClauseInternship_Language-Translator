 const fromText = document.querySelector(".from-text");
 const toText = document.querySelector(".to-text");
 
 selectTag = document.querySelectorAll('select');
 const exchangeicon = document.querySelector(".exchange");

 translateBtn = document.querySelector('button');
 icons = document.querySelectorAll(".row i");

 selectTag.forEach((tag,id) => {
     for(const country_code in countries)
     {
    //console.log(countries[country_code]);
    // selecting english by default as From language and Hindi as To language
    let selected;
    if(id == 0 && country_code == "en-GB")
    {
        selected ="selected";
    }
    else if(id == 1 && country_code == "hi-IN")
    {
        selected ="selected";
    }
    let option =`<option value="${country_code}" ${selected}>${countries[country_code]}</option>`;
    tag.insertAdjacentHTML("beforeend",option); // adding option tag inside select tag
    }
 });

 exchangeicon.addEventListener("click",() =>{
      // exchanging textarea and selecting tag values
    let tempText =fromText.value;
    tempLang = selectTag[0].value;
    fromText.value =toText.value;
    selectTag[0].value= selectTag[1].value;
    toText.value = tempText;
    selectTag[1].value = tempLang;

 })
 translateBtn.addEventListener("click",() =>{
    let text = fromText.value;
    translateFrom = selectTag[0].value, // getting fromslect tag value
    translateto = selectTag[1].value; // getting toselect tag value
   // console.log(text,translateFrom,translateto );
   if(!text) return;
   toText.setAttribute("placeholder","Translating....");
   let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateto}`;
   //
   //
   fetch(apiUrl).then(res =>res.json()).then(data =>
    {
        //console.log(data);
        toText.value = data.responseData.translatedText;
        toText.setAttribute("placeholder","Translation");

    });
 });
icons.forEach(icon =>{
    icon.addEventListener("click",({target})=>{
       // console.log(target);
       if(target.classList.contains("fa-copy"))
       {
        // if clicked icon has from id ,copy thr fromtextarea value else copy the totexyarea value
        if(target.id=="from")
        {
            navigator.clipboard.writeText(fromText.value);
        }
        else
        {
            navigator.clipboard.writeText(toText.value);
        }
    }
        else
        {
           let utterance ;
            // if clicked icon has from id ,speak the fromtextarea value else copy the totextarea value
           if(target.id =="from")
           {
            utterance = new SpeechSynthesisUtterance(fromText.value);
            utterance.lang = selectTag[0].value;// setting utterance language to fromSelect tag value
           }
           else
           {
            utterance = new SpeechSynthesisUtterance(toText.value);
            utterance.lang = selectTag[1].value; // setting utterance language to toselect tag value
           }
           speechSynthesis.speak(utterance); // speak the passed utterance
       }
    });
})

