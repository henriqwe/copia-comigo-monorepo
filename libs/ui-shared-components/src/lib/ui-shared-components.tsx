import './ui-shared-components.module.css';

/* eslint-disable-next-line */
export interface UiSharedComponentsProps {}

export function UiSharedComponents(props: UiSharedComponentsProps) {
  return (
    <div id="welcome">
      <h1>
        <span className="h-16"> Hello there, </span>
        Welcome primeiro-app | Este é um componente compartilhado
      </h1>
    </div>
  );
}

export default UiSharedComponents;
