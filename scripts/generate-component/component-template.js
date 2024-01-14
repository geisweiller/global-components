// component.tsx
export function component(name, fileName) {
  return `import React from 'react';
import styles from './${fileName}.module.css';

interface ${name}Props {
  /**
   * This explains foo.
   */
  foo: boolean;
  /**
   * This explains bar.
   */
  bar: string;
  /**
   * This explains baz.
   */
  baz: string;
}

export const ${name} = ({ foo, bar, baz }: ${name}Props) => {
  return(
  <div className={styles.wrapper}>
    <p>Hello 👋, I am a ${name} component.</p>
    <div>{foo ? bar : baz}</div>
  </div>
)
};

`;
}

// component.stories.jsx
export function story(name, fileName) {
  return `import React from 'react';
import ${name} from './${fileName}';

export default {
  title: 'Components/${name}',
  component: ${name},
};

const Template = (args) => <${name} {...args} />;

export const Default = Template.bind({});
Default.args = {
  foo: true,
  bar: 'Yes Foo',
  baz: 'No Foo',
};

export const Secondary = Template.bind({});
Secondary.args = {
  foo: false,
  bar: 'Yes Foo',
  baz: 'No Foo',
};
`;
}

// component.test.tsx
export function test(fileName) {
  return `import React from 'react';
import { render } from '@testing-library/react';
import { Default, Secondary } from './${fileName}.stories.js';
import { expect, test } from 'vitest';

test('renders Bar when foo is true', () => {
  const { getByText } = render(<Default {...Default.args} />);
  expect(getByText(Default.args.bar)).toBeInTheDocument();
});

test('renders Baz when foo is false', () => {
  const { getByText } = render(<Secondary {...Secondary.args} />);
  expect(getByText(Secondary.args.baz)).toBeInTheDocument();
});
`;
}
