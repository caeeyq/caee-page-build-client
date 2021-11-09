/**
 * 环境配置
 */
interface ConfigItem {
  BASE_URL: string
  MOCK_BASE_URL: string
}

type EnvConfigType = { [key in EnvironmentType]: ConfigItem }

const env = import.meta.env.VITE_ENV || 'prod'
const mockUrl = 'https://mock.com'

const envConfig: EnvConfigType = {
  dev: {
    BASE_URL: 'https://dev.com',
    MOCK_BASE_URL: mockUrl,
  },
  test: {
    BASE_URL: 'https://test.com',
    MOCK_BASE_URL: mockUrl,
  },
  prod: {
    BASE_URL: 'https://prod.com',
    MOCK_BASE_URL: mockUrl,
  },
}

const resConfig = envConfig[env]

export default {
  env,
  isMock: false,
  localStorageNamespace: `${env}:caee-page-build-client`,
  ...resConfig,
}
