import {
  AccessibilityIcon,
  AirConditionerIcon,
  ChairIcon,
  ElevatorIcon,
  GasTank,
  HeaterIcon,
  HotWaterIcon,
  PetIcon,
  SmokeFreeIcon,
  WifiIcon,
} from '../Common/Icons';
import { HouseServices } from '../../models/HouseServices';

interface Props {
  services: HouseServices;
}

export default function HouseServicesList({ services }: Props) {
  return (
    <div className='overflow-x-auto scrollbar-hide snap-mandatory snap-x overscroll-x-none'>
      <div className='grid grid-flow-col py-3 gap-x-3 snap-center'>
        {services.accessibility && (
          <ListItem icon={<AccessibilityIcon />} value='Accessibility' />
        )}
        {services.airConditioner && (
          <ListItem icon={<AirConditionerIcon />} value='A.C' />
        )}
        {services.elevator && (
          <ListItem icon={<ElevatorIcon />} value='Elevator' />
        )}
        {services.furniture && (
          <ListItem icon={<ChairIcon />} value='Furniture' />
        )}
        {services.heater && <ListItem icon={<HeaterIcon />} value='Heater' />}
        {services.heater && <ListItem icon={<GasTank />} value='City Gas' />}
        {services.hotWater && (
          <ListItem icon={<HotWaterIcon />} value='Hot Water' />
        )}
        {services.internet && <ListItem icon={<WifiIcon />} value='Internet' />}
        {services.petsAllowed && (
          <ListItem icon={<PetIcon />} value='Pets Allowed' />
        )}
        {services.smokingFree && (
          <ListItem icon={<SmokeFreeIcon />} value='Smoke Free' />
        )}
      </div>
    </div>
  );
}

interface ItemProps {
  icon: JSX.Element;
  value: any;
}
function ListItem({ icon, value }: ItemProps) {
  return (
    <div className='flex flex-col lg:flex-row lg:gap-x-3 justify-center items-center snap-center bg-black text-white w-auto min-w-[5rem]  lg:min-w-[7rem]'>
      <div className='py-1 fill-yellow-500 dark:fill-indigo-500'>{icon}</div>
      <p className=' font-Primary text-base lg:text-lg font-medium uppercase py-1 '>
        {value}
      </p>
    </div>
  );
}
