import { Link } from 'react-router-dom';
import { Icons } from '../Icons';
import { SelectLanguage } from '../SelectLanguage';

type Props = {
	children: React.ReactNode;
	url: string;
};
function ContainerLink({ children, url }: Props) {
	return (
		<div className="h-6 hover:text-blue-600 transition-colors duration-500">
			<a target="_blank" href={url} rel="noreferrer">
				{children}
			</a>
		</div>
	);
}

export function Footer() {
	return (
		<footer className="bg-slate-900 flex justify-center items-center p-4	text-white fixed bottom-0 w-full">
			<div className="flex flex-col items-center justify-center">
				<div>🛠 by Bruno Sajermann</div>

				<div className="flex gap-2">
					<ContainerLink url="https://www.linkedin.com/in/devbrunosajermann/">
						<Icons.Linkedin />
					</ContainerLink>

					<ContainerLink url="https://github.com/sajermann">
						<Icons.Github />
					</ContainerLink>
				</div>
			</div>
		</footer>
	);
}
