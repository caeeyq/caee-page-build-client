import request from '@/utils/service/request'
import { DogResp } from './model/dog'

export enum DemoApi {
  GET_RANDOM_DOG_PIC = 'https://dog.ceo/api/breeds/image/random',
}

export function getRandomDogPic() {
  return request.get<DogResp>(DemoApi.GET_RANDOM_DOG_PIC)
}
