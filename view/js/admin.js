// import axios from "axios"
window.onload = () => {
    fetchPlan()
}
const createPlan = async (event) => {
    try{
          event.preventDefault()
          const form = event.target

          const data = {
                 name : form[0].value,
                 storage : Number(form[1].value)*1000*1000,
                 price: form[2].value
          }

        const res = await axios.post('/api/plan' , data)
        console.log(res.data)
    }
    catch(err){
        console.log(err.response.data.message)
    }

}
const getMb = (byte)=>{
    const kb = byte / 1000
    const mb = kb / 1000
    return mb.toFixed(1)
}

const fetchPlan = async (event) => {
    try{
        const {data} = await axios.get('/api/plan')
        console.log(data)
        const plans = document.getElementById("plans")
        console.log(plans)
          
        // plans.innerHTML = " "
        for (let item of data) 
        {
            console.log(item)
            const ui = 
            `
             <div class="rounded-md bg-white p-6 text-gray-600 ring-2 ring-transparent transition-all hover:shadow peer-checked:text-sky-600 peer-checked:ring-blue-400 peer-checked:ring-offset-2" >
                      <div class="flex items-center justify-between" >
                          <p class="text-sm font-semibold uppercase text-gray-500">${item.name}</p>
                          <svg class="text-gray-500" width="24" height="24" viewBox="0 0 24 24">
                          <path fill="currentColor"
                                     d="m10.6 13.8l-2.175-2.175q-.275-.275-.675-.275t-.7.3q-.275.275-.275.7q0 .425.275.7L9.9 15.9q.275.275.7.275q.425 0 .7-.275l5.675-5.675q.275-.275.275-.675t-.3-.7q-.275-.275-.7-.275q-.425 0-.7.275ZM12 22q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Z" />
                          </svg>
                      </div>
                       <div class="flex items-end justify-between mt-4">
                             <p><span class="text-lg font-bold">${getMb(item.storage)} MB</span> of storage</p>
                             <p class="text-sm font-bold">${item.price.toLocaleString() }/ mo</p>
                       </div>
              </div>

            `
            plans.innerHTML += ui
        }
        
    }
    catch(err){
        console.log(err.response.data.message)
    }

}


