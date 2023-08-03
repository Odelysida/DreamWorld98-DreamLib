using System;
namespace _winDreamServ
{
    internal static class main
    {
        /// <summary>
        /// The main entry point for the Windows DreamServ DreamWorld98 Server System.
        /// This Programm is intended to be used with the DreamServ Javacript Networking Library & Action for DreamWorld98
        /// Server is used to Send outputed CCB Data to Webserver & Action(Library of ccbHTTP) is used to get Data back into CCB
        /// Other Functions: Create Players and assign them to Users, Register Users, Change Stats and throw Commands
        /// </summary>
        [STAThread]
        public static void Main()
        {

            Console.WriteLine("DreamServ - DreamWorld98 Server Interface for Windows!\n Press E[x]it\n [N]ew Player ");
            while (true)
            {
                string userKeyInput = Console.ReadLine();
                if (userKeyInput == "x")
                {
                    break;
                }
                else if (userKeyInput == "n")
                {
                    Console.WriteLine("Creating a new Player!´\n Enter User ID:\n");
                    int ownedByUserId = Convert.ToInt32(Console.ReadLine());
                    try
                    {
                        DataAccess.CreateNewPlayer(ownedByUserId);
                        Console.WriteLine("Player Created Successfully!");
                    }
                    catch (Exception Ex)
                    {
                        Console.WriteLine(Ex.Message);
                    }


                }
            }

        }
    }
}
