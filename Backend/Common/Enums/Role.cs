namespace Common.Enums
{
    public enum Role : byte
    {
        Student = 0,
        Teacher,
        Deneary,
        Admin
    }

    public static class AccessRights
    {
        public const string Admin = "Admin";
        public const string Deneary = Admin + ",Deneary";
        public const string Teacher = Deneary + ",Teacher";
        public const string Student = Teacher + ",Student";
    }
}
