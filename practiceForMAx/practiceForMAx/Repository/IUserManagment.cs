using practiceForMAx.Models;

namespace practiceForMAx.Repository
{
    public interface IUserManagment
    {
        public List<UserModel> GetAllUsers();
        public List<UserModel> GetUsersByDepartment(string department);
        public void UpdateUser(List<UserModel> usersModel);
    }
}
