const login = async (e)=>{
  try {
      e.preventDefault()
      const form = e.target

      const data = {
          email: form.elements[0].value.trim(),
          password: form.elements[1].value.trim()
      }

      const res = await axios.post('/api/login', data)
      // console.log(res.data);
      
       localStorage.setItem("Auth", res.data.token )

      new Swal({
        icon: 'success',
        title: 'login success'
    }).then(() => {
           window.location = "/app/dashboard.html"

    })
      
  }
  catch(err)
  {
      new Swal({
          icon: 'error',
          title: err.response.data.message
      })
  }
  
}

            

  