import api from '@/api';

export type IAudioRequest = {
  user_oid: string;
  id: string;
  phone: string;
  lyrics: string;
  audio_url1: string;
  audio_url2: string;
};

export default class AudioService {
  static async saveGeneratedAudioFromUrl(audio: IAudioRequest): Promise<void> {
    return api.post('/audios/save_url', audio);
  }
}
