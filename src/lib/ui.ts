import { videos } from '../data/videos';

const htmlEl = document.querySelector<HTMLHtmlElement>('html')!;
const settingsEl = document.querySelector<HTMLDivElement>('.settings')!;
const settingsSwitchEl = document.querySelector<HTMLFormElement>('#settings-switch')!;
const darkmodeSwitchEl = document.querySelector<HTMLFormElement>('#darkmode-switch')!;
const videoSelectEl = document.querySelector<HTMLSelectElement>('#select-video')!;

const toggleSettingPanel = () => {
    settingsSwitchEl.addEventListener('change', ({ target }) => {
        const value = (target as unknown as { checked: boolean })!.checked;
        settingsEl.classList[value ? 'remove' : 'add']('hidden');
    });
};

const toggleDarkMode = () => {
    darkmodeSwitchEl.addEventListener('change', ({ target }) => {
        const value = (target as unknown as { checked: boolean })!.checked;
        htmlEl.dataset.theme = value ? 'dark' : 'light';
    });
};

const setupVideoSelector = (videosList: typeof videos, onChange: (video: any) => void) => {
    videoSelectEl.innerHTML = `${videosList.map(
        video => `<option value="${video.hash}">${video.title}</option>`,
    )}`;
    videoSelectEl.addEventListener('change', () => {
        const videoIndex = videosList.findIndex(video => video.hash === videoSelectEl.value);
        onChange(videosList[videoIndex]);
    });
};

export const setupUI = (videosList: typeof videos, onChange: (video: any) => void) => {
    toggleSettingPanel();
    toggleDarkMode();
    setupVideoSelector(videosList, onChange);
};
