import ISubnetwork from './ISubnetwork';

export default interface INetwork {
  name: string;
  ip: string;
  subnetworks: ISubnetwork[];
}