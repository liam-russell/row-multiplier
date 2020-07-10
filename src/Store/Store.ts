import { observable, runInAction, computed, reaction } from 'mobx';
import { Step } from './Step';
import { useContext, createContext } from 'react';
import { FileRejection } from 'react-dropzone';
import csv from 'async-csv';
import Notif from './Notif';
import { v4 } from 'uuid';

export default class Store {

    constructor() {
        reaction(
            () => this.step,
            step => {
                (async () => {
                    if (step === Step.Download) {
                        runInAction(() => {
                            this.downloadUrl = undefined;
                        });
                        const string = await csv.stringify(this.processed);
                        const blob = new Blob([string], { type: 'text/csv' });
                        const url = window.URL.createObjectURL(blob);
                        runInAction(() => {
                            this.downloadUrl = url;
                        });
                    }
                })().catch(() => this.notify('bad', 'Could not generate download link.'));
            }
        );
    }

    @observable step = Step.Select;
    @observable multipler = 2;
    @observable removeHeader = false;
    @observable downloadUrl?: string;
    @observable selected?: string[][] = undefined;
    @observable notifications: Notif[] = [];

    @computed get processed() {
        if (this.selected === undefined || (this.step !== Step.Confirm && this.step !== Step.Download)) {
            return undefined;
        }

        const trimmed = this.selected.slice(this.removeHeader ? 1 : 0, undefined);

        //multiply

        const result = [];
        for (let row = 0; row < trimmed.length; ++row) {
            for (let enumeration = 0; enumeration < this.multipler; ++enumeration) {
                result.push(trimmed[row]);
            }
        }

        return result;
    }

    select = (accepted: File[], rejected: FileRejection[]) => {
        if (rejected.length > 0) {
            rejected.forEach(r => {
                r.errors.forEach(e => {
                    this.notify('bad', e.message);
                })
            })
            return;
        }

        if (accepted.length !== 1) {
            this.notify('bad', `Expected 1 file, got ${accepted.length}`);
        }
        const file = accepted[0];

        const reader = new FileReader();

        reader.onload = (e: ProgressEvent<FileReader>) => {
            (async () => {
                const contents = e?.target?.result;
                const result = await csv.parse(contents);

                runInAction(() => {
                    this.selected = result;
                    this.nextStep();
                });

            })().catch(e => this.notify('bad', 'Error parsing CSV, are you sure it is valid?'))
        };
        reader.readAsText(file);
    }

    nextStep = () => {
        switch (this.step) {
            case Step.Select:
                this.step = Step.Settings;
                break;
            case Step.Settings:
                this.step = Step.Confirm;
                break;
            case Step.Confirm:
                this.step = Step.Download;
                break;
            case Step.Download:
                this.step = Step.Donate;
                break;
            default:
                this.notify('bad', 'Can\'t move forward, on the last step already.')
        }
    }

    notify = (style: 'good' | 'bad', message: string) => {
        this.notifications.push({
            id: v4(),
            message: message,
            style: style
        });
    }

    notificationClicked = (id: string) => {
        this.notifications = this.notifications.slice().filter(a => a.id !== id);
    }
}

export const storesContext = createContext(new Store());

export const useStore = () => useContext(storesContext);
