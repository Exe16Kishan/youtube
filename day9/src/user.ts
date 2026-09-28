class User {
  constructor(
    private readonly id: string,
    public readonly username: string,
    public readonly displayName: string,
  ) {
    
  }
}

export {
    User
}