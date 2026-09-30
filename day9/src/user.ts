class User {
  constructor(
    public readonly id: string,
    public readonly username: string,
    public readonly displayName: string,
    public reputation: number = 0,
  ) {}

  addReputation(point:number){
      this.reputation +=point
  }
}

export { User };