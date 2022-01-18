import { render } from '@testing-library/react';

import UiSharedComponents from './ui-shared-components';

describe('UiSharedComponents', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UiSharedComponents />);
    expect(baseElement).toBeTruthy();
  });
});
