interface EnvironmentConfig {
    username: string;
    password: string;
}

const dev: EnvironmentConfig = {
    username: 'dathdws',
    password: '122711'
};

const pro: EnvironmentConfig = {
    username: 'dathdws',
    password: '122711'
};

const config: Record<string, EnvironmentConfig> = { dev, pro };

const env: string = process.env.NODE_ENV || 'dev';

export default config[env];
