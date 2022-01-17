import styles from './ui-shared-components.module.css';

/* eslint-disable-next-line */
export interface UiSharedComponentsProps {}

export function UiSharedComponents(props: UiSharedComponentsProps) {
  return (
    <div id="welcome" className={styles.test}>
      <h1>
        <span className="bg-gray-500"> Hello there, </span>
        Welcome primeiro-app | Este é um componente compartilhado
      </h1>
    </div>
  );
}

export default UiSharedComponents;
