import './ui-shared-components.module.css';

/* eslint-disable-next-line */
export interface UiSharedComponentsProps {}

export function UiSharedComponents(props: UiSharedComponentsProps) {
  return (
    <div id="welcome" className="p-4">
      <h1>
        <span className="bg-blue-500"> Hello there, </span>
        Welcome primeiro-app | Este é um componente compartilhado
      </h1>
    </div>
  );
}

export default UiSharedComponents;
