import {common} from '@comigo/ui-shared-components'

/* eslint-disable-next-line */
export interface SeparatorWithTitleAndNumberProps {
  title: string;
  number: string | number
  className?: string;
}

export function SeparatorWithTitleAndNumber({title,number, className=''}: SeparatorWithTitleAndNumberProps) {
  return (
    <div className={`flex items-center text-sm ${className}`}>
      <span className='nowrap'>{title}</span>
      <common.Separator className='flex-1 mx-1'/>
      <span className="text-sm bg-gray-500 px-2 rounded-full text-white">{number}</span>
    </div>
  );
}

export default SeparatorWithTitleAndNumber;
