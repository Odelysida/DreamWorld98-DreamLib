namespace _winDreamServ
{
    internal class Player
    {

        public Player(int id, int experience, int mana, int armor, int health, int ownedByUserId, int worldId, int inventoryId, float wPositionX, float wPositionY, float wPositionZ)
        {
            this.Id = id;
            this.Experience = experience;
            this.Mana = mana;
            this.Armor = armor;
            this.Health = health;
            this.OwnedByUserId = ownedByUserId;
            this.WorldId = worldId;
            this.inventoryId = inventoryId;
            this.WPositionX = wPositionX;
            this.WPositionY = wPositionY;
            this.WPositionZ = wPositionZ;
        }
        private int Id { get => Id; set => Id = value; }
        private int Experience { get => Experience; set => Experience = value; }
        private int Mana { get => Mana; set => Mana = value; }
        private int Armor { get => Armor; set => Armor = value; }
        private int Health { get => Health; set => Health = value; }
        private int OwnedByUserId { get => OwnedByUserId; set => OwnedByUserId = value; }
        private int WorldId { get => WorldId; set => WorldId = value; }
        private int inventoryId { get => inventoryId; set => inventoryId = value; }
        private float WPositionX { get => WPositionX; set => WPositionX = value; }
        private float WPositionY { get => WPositionY; set => WPositionY = value; }
        private float WPositionZ { get => WPositionZ; set => WPositionZ = value; }
    }

}
