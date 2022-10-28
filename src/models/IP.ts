export default class IP {

  private mask: number;

  constructor (
    public addr32: number,
    public slash: number,
  ) {
    this.mask = IP.unsigned(~0 << (32 - slash));
  }

  private static unsigned(n: number) { return n >>> 0; }

  public static convertString(ip: number): string {
    return [
      (ip >>> 24) & 0xFF,
      (ip >>> 16) & 0xFF,
      (ip >>>  8) & 0xFF,
      (ip >>>  0) & 0xFF
    ].join('.');
  }

  public toString(): string {
    return IP.convertString(this.addr32);
  }

  static parseIP(ip: string): IP {
    const slash = parseInt(ip.split('/')[1]);
    const bytes = ip.split('.').map<number>((s) => parseInt(s));
    const addr32 = bytes.reduce((a, o) => this.unsigned(a << 8) + +o);

    return new IP(addr32, slash);
  }

  
  public get netID(): number {
    return IP.unsigned(this.addr32 & this.mask);
  }

  public get broadcast(): number {
    return IP.unsigned(this.addr32 | ~this.mask);
  }

  public get gateway(): number {
    return this.broadcast - 1;
  }

  public get ipRangeStart(): number {
    return this.netID + 1;
  }

  public get ipRangeEnd(): number {
    return this.gateway - 1;
  }
  
}