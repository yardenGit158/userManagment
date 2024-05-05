using practiceForMAx.Models;

namespace practiceForMAx.Repository
{
    public class UserManagment : IUserManagment
    {
        private Dictionary<string,UserModel> users= new Dictionary<string,UserModel>();

        public UserManagment()
        {
            InitilizrData();

        }
        private void InitilizrData ()
        {
            users.Add("jdoe", new UserModel { UserName = "jdoe", Name = "John Doe", Gender = "Male", Department = "HR", Age = 30 });
            users.Add("asmith", new UserModel { UserName = "asmith", Name = "Alice Smith", Gender = "Female", Department = "IT", Age = 24 });
            users.Add("bwilliams", new UserModel { UserName = "bwilliams", Name = "Bob Williams", Gender = "Male", Department = "Finance", Age = 40 });
        }
        public List<UserModel> GetAllUsers()
        {
           return users.Values.ToList();
        }

        public List<UserModel> GetUsersByDepartment(string department)
        {
            return users.Values.Where(user => user.Department == department).ToList();
        }

        public void UpdateUser(List<UserModel> usersModel)
        {
            foreach (var user in usersModel)
            {
                users[user.UserName] = user; // This ensures existing users are updated, and new users are added
            }

        }
    }
}
