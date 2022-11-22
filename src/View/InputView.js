const MissionUtils = require('@woowacourse/mission-utils');
const BridgeMaker = require('../BridgeMaker');
const BridgeRandomNumberGenerator = require('../BridgeRandomNumberGenerator');
const BridgeGame = require('../BridgeGame');
const Check = require('../Utils/Check');
const Vaild = require('../Utils/Vaild');
const BridgePrint = require('../BridgePrint');

const { INPUT_MESSAGES } = require('../common/messages');
const InputView = {
  readBridgeSize() {
    MissionUtils.Console.readLine(`${INPUT_MESSAGES.INPUT_BRIDGESIZE}`, (size) => {
      MissionUtils.Console.print('');
      Vaild.isVaildSize(size);
      const brige = BridgeMaker.makeBridge(size, BridgeRandomNumberGenerator.generate);
      const gamePlay = new BridgeGame(brige);
      this.readMoving(gamePlay);
    });
  },

  readMoving(gamePlay) {
    const playerInput = (input) => {
      Vaild.isVaildInput(input);
      gamePlay.move(input);
      if (this.checkGameOver(gamePlay) === 0) return;
      return this.readMoving(gamePlay);
    };
    MissionUtils.Console.readLine(`${INPUT_MESSAGES.INPUT_MOVE}`, playerInput);
  },

  checkGameOver(gamePlay) {
    if (gamePlay.getIsWinnging()) {
      BridgePrint.printResult(gamePlay);
      MissionUtils.Console.close();
      return 0;
    }
    if (gamePlay.getIsGameOver()) {
      this.readGameCommand(gamePlay);
    }
  },

  readGameCommand(gamePlay) {
    MissionUtils.Console.readLine(`${INPUT_MESSAGES.INPUT_RETRY}`, (answer) => {
      if (Check.checkRestartGame(answer, gamePlay)) {
        this.readMoving(gamePlay);
      }
    });
  },
};

module.exports = InputView;
