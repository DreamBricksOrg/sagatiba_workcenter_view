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
  static save_generated_audio_from_url = async (audio: IAudioRequest) => {
    try {
      const response = await api.post('/audios/save_url', {
        audio,
      });
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.error(error);
    }
  };
}
