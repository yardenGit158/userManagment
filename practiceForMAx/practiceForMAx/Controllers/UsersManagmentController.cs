using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using practiceForMAx.Models;
using practiceForMAx.Repository;

namespace practiceForMAx.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersManagmentController : ControllerBase
    {
        private readonly IUserManagment _userManagment;
        public UsersManagmentController(IUserManagment userManagment)
        {
            _userManagment = userManagment;
        }





        [HttpGet]
        [Route("GetAllUsers")]
        public ActionResult<List<UserModel>> GetAllUsers()
        {
            return Ok(_userManagment.GetAllUsers());
        }

        [HttpGet]
        [Route("GetByDepartment")]
        public ActionResult<List<UserModel>> GetUsersByDepartment(string department)
        {
            return Ok(_userManagment.GetUsersByDepartment(department));
        }

        [HttpPost]
        [Route("updateUsers")]
        public ActionResult<List<UserModel>> UpdateUsers(List<UserModel> users)
        {
            int batchSize = 3;
            for (int i = 0; i < users.Count; i += batchSize)
            {
                _userManagment.UpdateUser(users.Skip(i).Take(batchSize).ToList());


            }
            return Ok(_userManagment.GetAllUsers());
        }


    }
}
