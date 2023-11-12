const modal_elem = document.getElementById("modal");
const modal_text = document.querySelector("p");
const modal_btn = document.getElementById("modal-btn")


const showModal = (text)=>{
    modal_elem.style.display = "flex";
    modal_text.innerText = text;
   }

   const closeModal = ()=>{
    modal_elem.style.display = "none";
    }
    modal_btn.addEventListener("click" ,closeModal)
   export {showModal , closeModal};