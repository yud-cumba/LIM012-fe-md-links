const cipher = {
   encode: (offset, string) => {
      if(offset===0 || offset=="" || string===0 || string==""){  throw new TypeError();}
      else{
         let textchanged="";
         let letterchanged ="";
         for(let i=0; i<string.length; i++){       
            if(string.charCodeAt(i)>=65 && string.charCodeAt(i)<=90){
            letterchanged= String.fromCharCode((string.charCodeAt(i) - 65 + parseInt(offset)) % 26+ 65);
            }
            else if(string.charCodeAt(i)>=97 && string.charCodeAt(i)<=122){
            letterchanged= String.fromCharCode((string.charCodeAt(i) - 97 + parseInt(offset)) % 26+ 97);
            }
            else{
            letterchanged = string[i];
            }
         textchanged = textchanged+letterchanged;
         }
       return textchanged;
      }
   },
   decode: (offset, string) => {
      if(offset===0 || offset=="" || string===0 || string==""){  throw new TypeError();}
      else{ 
         let textchanged = "";
         let letterchanged = "";
            for(let i=0; i<string.length; i++){
               if(string.charCodeAt(i)>=65 && string.charCodeAt(i)<=90){
                  letterchanged= String.fromCharCode((string.charCodeAt(i) -65+26-(parseInt(offset) % 26))%26+ 65);
               }
               else if(string.charCodeAt(i)>=97 && string.charCodeAt(i)<=122){
                  letterchanged= String.fromCharCode((string.charCodeAt(i) -97+26-(parseInt(offset) % 26))%26+ 97);
               }
               else{
                  letterchanged=string[i];
               }
               textchanged = textchanged+letterchanged;
            }
            return textchanged;
      }
   }
};
  export default cipher;
