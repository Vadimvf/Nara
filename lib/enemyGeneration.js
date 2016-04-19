import { EnemyTypeA } from './enemyTypeA';
import { EnemyTypeB } from './enemyTypeB';
import { EnemyTypeC } from './enemyTypeC';
import { Game } from './game';

const enemyGeneration = {
  generating: false,
  numEnemies: 0,

  _reset: () => {
    enemyGeneration.numEnemies = 0;
    enemyGeneration.generating = true;
  },

  _generateSkeleton: (enemyGenerate, numEnemies, spacing) => {
    enemyGeneration._reset();
    enemyGeneration.interval = setInterval(() => {
      enemyGenerate();

      if (enemyGeneration.numEnemies === numEnemies){
        clearInterval(enemyGeneration.interval);
        enemyGeneration.numEnemies = 0;

        setTimeout(() => {
          enemyGeneration.generating = false;
        }, 5000);

    }}, spacing);
  },

  WAVE_A: (color=null) => {
    let _enemyGenerate = () =>{
      Game.ships[enemyGeneration.numEnemies] = new EnemyTypeA(color);
      enemyGeneration.numEnemies++;
    };

    enemyGeneration._generateSkeleton(_enemyGenerate, 500, 45);
  },

  WAVE_B: () => {
    let _enemyGenerate = () =>{
      for (let i = 0; i <=5; i++){
        Game.ships[enemyGeneration.numEnemies] = new EnemyTypeC();
        Game.ships[enemyGeneration.numEnemies] = new EnemyTypeC();
      }
      enemyGeneration.numEnemies += 10;
    };

    enemyGeneration._generateSkeleton(_enemyGenerate, 2000, 50);
  },

  WAVE_C: () => {
    let _enemyGenerate = () =>{
      for (let i = 0; i <=5; i++){
        Game.ships[enemyGeneration.numEnemies] = new EnemyTypeC(true);
        Game.ships[enemyGeneration.numEnemies] = new EnemyTypeC(true);
      }
      enemyGeneration.numEnemies += 10;
    };

    enemyGeneration._generateSkeleton(_enemyGenerate, 2000, 75);
  },

  WAVE_D: (color=null) => {
    let _enemyGenerate = () =>{
      for (let i = 0; i <=5; i++){
        Game.ships[enemyGeneration.numEnemies] = new EnemyTypeB(true,color);
        Game.ships[enemyGeneration.numEnemies] = new EnemyTypeB(true,color);
      }
      enemyGeneration.numEnemies += 10;
    };

    enemyGeneration._generateSkeleton(_enemyGenerate, 1200, 250);
  },

  WAVE_E: () => {
    let _enemyGenerate = () =>{
      for (let i = 0; i <=5; i++){
        Game.ships[enemyGeneration.numEnemies] = new EnemyTypeB();
        Game.ships[enemyGeneration.numEnemies] = new EnemyTypeB();
      }
      enemyGeneration.numEnemies += 10;
    };

    enemyGeneration._generateSkeleton(_enemyGenerate, 2000, 75);
  }

};

export { enemyGeneration };
