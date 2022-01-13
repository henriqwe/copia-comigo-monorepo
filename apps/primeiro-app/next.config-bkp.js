// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNx = require('@nrwl/next/plugins/with-nx');
const withPlugins = require('next-compose-plugins');
const withTM = require('next-transpile-modules')(['@comigo/ui-shared-components'])

const nextConfig = {
  nx: {
    svgr: false
  },
  reactStrictMode: true,
};

const plugins = [
  [withNx],
];

module.exports = withTM(withPlugins([...plugins], nextConfig));
