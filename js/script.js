const selectTag = document.querySelectorAll("select"),
 toText =document.querySelector(".to-text"),
 fromText =document.querySelector(".from-text"),
translateBtn = document.querySelector("button"),
exchangeIcon = document.querySelector(".exchange"),
icons =document.querySelectorAll(".row i");
selectTag.forEach((tag, id) => {
   for (const country_code in countries) {
      //setting English by default as From language and Hindi as To language
      let selected;
      if(id == 0 && country_code == "en-GB") {
         selected = "selected";
      } else if(id == 1 && country_code == "hi-IN"){
         selected = "selected";
      }
   let option =`<option value="${country_code}" ${selected}>${countries[country_code]}</option>`;
   tag.insertAdjacentHTML("beforeend",option); //adding options tag iside select tag
   }
});
//to enable the exchange icon effect and exchange the contents of textarea
exchangeIcon.addEventListener("click", () =>{
   let tempText = fromText.value,
   templang = selectTag[0].value;
   fromText.value = toText.value;
   selectTag[0].value =selectTag[1].value;
   toText.value = tempText;
   selectTag[1].value = templang;
});
translateBtn.addEventListener("click",() => {
   let text = fromText.value,
   translateFrom = selectTag[0].value, //getting fromSelect tag value
   translateTo = selectTag[1].value;   //getting toSelect tag value
   if(!text) return;
   toText.setAttribute("placeholder","Translating...");
 let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
 // fetching api response and returning it with parsing into js obj and in another then method receiving that obj
   fetch(apiUrl).then(res => res.json()).then(data => {
      toText.value = data.responseData.translatedText;
      toText.setAttribute("placeholder","Translation");
   });

});
icons.forEach(icon =>{
   icon.addEventListener("click", ({target}) =>{
      if(target.classList.contains("fa-copy")){
         //if clicked icon has from id,copy th fromTextarea value else copy the toTextarea value
         if(target.id == "from"){
           navigator.clipboard.writeText(fromText.value);
         } else{
            navigator.clipboard.writeText(toText.value);
         }
      } else{
         let utterance;
         if(target.id == "from"){
           utterance = new SpeechSynthesisUtterance(fromText.value); 
           utterance.lang =selectTag[0].value; //setting utterance language to fromSelected tag value
          } else{
            utterance = new SpeechSynthesisUtterance(toText.value); 
            utterance.lang= selectTag[1].value //setting utterance language to toSelected tag value
          }
          speechSynthesis.speak(utterance); //speaking the passed utterance
         }
   });
});