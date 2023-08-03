using MySql.Data.MySqlClient;
using System;

namespace _winDreamServ
{
    internal class DataAccess
    {

        private readonly string createNewPlayerQuery;
        private readonly string updatePlayerStatsQuery;
        private readonly string updatePlayerWorldPosQuery;
        private static Player dwPlayer;


        public static MySqlConnection MySqlConnection()
        {
            MySqlConnection Connection = new MySqlConnection("datasource=localhost;port=3306;username=root;password=;");
            return Connection;
        }

        public static void DataAccessInput()
        {

        }
        public static void CreateNewPlayer(int ownedByUserId)
        {
            string CreateNewPlayerQuery = "INSERT INTO players(ownedByUserId) VALUES('" + ownedByUserId + "');";
            try
            {
                MySqlCommand createPlayerCommand = new MySqlCommand(CreateNewPlayerQuery, MySqlConnection());
                MySqlDataReader MyReader;
                MySqlConnection().Open();
                try
                {
                    MyReader = createPlayerCommand.ExecuteReader();
                    Console.WriteLine("Player Created Successfully!");

                    while (MyReader.Read())
                    {

                    }
                }
                catch (MySqlException sErr)
                {
                    Console.WriteLine(sErr.Message);
                    MySqlConnection().Close();
                }

                MySqlConnection().Close();
            }

            catch (Exception Ex)
            {
                string ExceptionMsg = Ex.Message;
                Console.WriteLine(ExceptionMsg);
            }


        }

        public static void CreateNewUser(string UserUsername, string UserPassword, string UserEmailAdress, bool UserHasModRights)
        {
            string CreateNewUserQuery = "INSERT INTO users(username, password, email, hasModRights) VALUES ('" + UserUsername + "','" + UserPassword + "','" + UserEmailAdress + "','" + UserHasModRights + "');";
            try
            {
                MySqlCommand createUserCommand = new MySqlCommand(CreateNewUserQuery, MySqlConnection());
                MySqlDataReader MyReader;
                MySqlConnection().Open();
                try
                {
                    MyReader = createUserCommand.ExecuteReader();
                    Console.WriteLine("User Created Successfully!");

                    while (MyReader.Read())
                    {

                    }
                }
                catch (MySqlException sErr)
                {
                    Console.WriteLine(sErr.Message);
                    MySqlConnection().Close();
                }

                MySqlConnection().Close();
            }
            catch (MySqlException Ex)
            {

            }
        }


    }


}
