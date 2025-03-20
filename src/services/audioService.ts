import api from '@/api';

export type IAudioRequest = {
  worker_oid: string;
  id: string;
  lyrics_oid: string;
  audio_url1: string;
  audio_url2: string;
  phone: string;
};

export default class AudioService {
  static async saveGeneratedAudioFromUrl(audio: IAudioRequest): Promise<void> {
    return api.post('/audios/save_url', audio);
  }
}
