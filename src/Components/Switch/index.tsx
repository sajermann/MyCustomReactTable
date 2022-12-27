/* eslint-disable jsx-a11y/label-has-associated-control */
import { SyntheticEvent } from 'react';
import ReactSwitch from 'react-switch';

type Props = {
	checked: boolean;
	onChange: (
		checked: boolean,
		event: MouseEvent | SyntheticEvent<MouseEvent | KeyboardEvent, Event>,
		id: string
	) => void;
	id?: string;
	uncheckedHandleIcon?: JSX.Element;
	checkedHandleIcon?: JSX.Element;
};

export function Switch({
	checked,
	onChange,
	id,
	uncheckedHandleIcon,
	checkedHandleIcon,
}: Props) {
	return (
		<ReactSwitch
			checked={checked}
			onChange={onChange}
			handleDiameter={28}
			offColor="#ac0d0d"
			// onColor="#0ff"
			// offHandleColor="#0ff"
			// onHandleColor="#08f"
			// height={40}
			// width={70}
			// borderRadius={6}
			// activeBoxShadow="0px 0px 1px 2px #fffc35"
			uncheckedIcon={<div />}
			checkedIcon={<div />}
			uncheckedHandleIcon={uncheckedHandleIcon}
			checkedHandleIcon={checkedHandleIcon}
			// className="react-switch"
			id={id}
		/>
	);
}
