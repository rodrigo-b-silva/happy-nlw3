import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Orphanage from '../models/Orphanage';

export default {
  async index(req: Request, res: Response) {
    const orphanagesRepository = getRepository(Orphanage);

    const orphanages = await orphanagesRepository.find({
      relations: ['images']
    });
    
    return res.status(200).json(orphanages);
  },

  async show(req: Request, res: Response) {
    const orphanagesRepository = getRepository(Orphanage);
    
    const { id } = req.params;
    
    const orphange = await orphanagesRepository.findOne(id, {
      relations: ['images']
    });
    
    if(!orphange)
      return res.status(400).json({ message: 'Orphanage not exists' });   

    return res.status(200).json(orphange);   
  },

  async create(req: Request, res: Response) {
    try {
      const {
        name, latitude, longitude, about, instructions, opening_hours, open_on_weekends
      } = req.body;
      
      const orphanagesRepository = getRepository(Orphanage);
  
      console.log(req.files)
      const requestImages = req.files as Express.Multer.File[];
      const images = requestImages.map(image => {
        return { path: image.filename }
      })
      console.log(images)
      
      const orphanage = orphanagesRepository.create({
        name, latitude, longitude, about, instructions, opening_hours, open_on_weekends, images
      });
      
      await orphanagesRepository.save(orphanage);
  
      return res.status(201).json(orphanage);
    } catch(err) {
      console.log(err)
    }
  }
}