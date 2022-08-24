import Swal from 'sweetalert2'
import jwt_decode from 'jwt-decode'

export function logout() {
  if (localStorage.currentUser && localStorage.currentUserToken) {
    const swalDelete = Swal.mixin({
      customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalDelete.fire({
      title: `Are you want to logout ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, I want it!',
      cancelButtonText: 'No, cancel please!',
      reverseButtons: true
      }).then( async (result) => {
      if (result.isConfirmed) {
            swalDelete.fire(
              'Logout Successful',
              `You have been logout!`,
              'success'
            ).then(() => {
            if(localStorage.currentUserToken) localStorage.removeItem('currentUserToken');
            if(localStorage.currentUserRefreshToken) localStorage.removeItem('currentUserRefreshToken');
            if(localStorage.currentUserRole) localStorage.removeItem('currentUserRole');
            localStorage.removeItem('currentUser');
            location.reload()
            })

      } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalDelete.fire(
            'Cancelled Logout',
            'You are still logged in :)',
            'error'
          )
        }
      })
  } 
  
  return null
}