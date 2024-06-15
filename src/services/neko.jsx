import React, { useEffect } from 'react';
import nekoGif from '../assets/oneko/oneko-classic.gif'; // Adjust the path as necessary

const Neko = () => {
  useEffect(() => {
    (function oneko() {
      const nekoEl = document.createElement('div');
      let nekoPosX = window.innerWidth * 0.5,
        nekoPosY = 32,
        mousePosX = 0,
        mousePosY = 0,
        frameCount = 0,
        idleTime = 0,
        idleAnimation = null,
        idleAnimationFrame = 0,
        grabbing = false,
        grabStop = true,
        nudge = false,
        forceSleep = true,
        isCatFixed = true,
        targetX,
        targetY = 32;

      const nekoSpeed = 10,
        spriteSets = {
          idle: [[-3, -3]],
          alert: [[-7, -3]],
          scratchSelf: [
            [-5, 0],
            [-6, 0],
            [-7, 0],
          ],
          scratchWallN: [
            [0, 0],
            [0, -1],
          ],
          scratchWallS: [
            [-7, -1],
            [-6, -2],
          ],
          scratchWallE: [
            [-2, -2],
            [-2, -3],
          ],
          scratchWallW: [
            [-4, 0],
            [-4, -1],
          ],
          tired: [[-3, -2]],
          sleeping: [
            [-2, 0],
            [-2, -1],
          ],
          N: [
            [-1, -2],
            [-1, -3],
          ],
          NE: [
            [0, -2],
            [0, -3],
          ],
          E: [
            [-3, 0],
            [-3, -1],
          ],
          SE: [
            [-5, -1],
            [-5, -2],
          ],
          S: [
            [-6, -3],
            [-7, -2],
          ],
          SW: [
            [-5, -3],
            [-6, -1],
          ],
          W: [
            [-4, -2],
            [-4, -3],
          ],
          NW: [
            [-1, 0],
            [-1, -1],
          ],
        };

      function init() {
        nekoEl.id = 'oneko';
        nekoEl.title = 'This is neko!';
        nekoEl.ariaHidden = true;
        nekoEl.style.width = '32px';
        nekoEl.style.height = '32px';
        nekoEl.style.position = 'fixed';
        nekoEl.style.pointerEvents = 'auto';
        nekoEl.style.imageRendering = 'pixelated';
        nekoEl.style.left = `${nekoPosX - 16}px`;
        nekoEl.style.top = `${nekoPosY - 16}px`;
        nekoEl.style.zIndex = 100;
        nekoEl.style.cursor = 'grab';
        nekoEl.style.margin = '10px'


        const nekoFile = nekoGif; // Use the imported GIF
        nekoEl.style.backgroundImage = `url(${nekoFile})`;

        document.body.appendChild(nekoEl);

        nekoEl.addEventListener('dblclick', sleep);

        document.addEventListener('mousemove', function (event) {
          if (!isCatFixed) {
            mousePosX = event.clientX;
            mousePosY = event.clientY;
          }
        });

        nekoEl.addEventListener('mousedown', (e) => {
          if (e.button !== 0) return; // Only respond to left mouse button
          nekoEl.style.cursor = 'grabbing';
          startDrag(e.clientX, e.clientY);
        });

        nekoEl.addEventListener('touchstart', (e) => {
          const touch = e.touches[0];
          startDrag(touch.clientX, touch.clientY);
          e.preventDefault();
        }, { passive: false });

        function startDrag(startX, startY) {
          grabbing = true;
          let startNekoX = nekoPosX;
          let startNekoY = nekoPosY;
          let grabInterval;
        
          const move = (e) => {
            const deltaX = (e.clientX || e.touches[0].clientX) - startX;
            const deltaY = (e.clientY || e.touches[0].clientY) - startY;
            const absDeltaX = Math.abs(deltaX);
            const absDeltaY = Math.abs(deltaY);
        
            // Scratch animation based on drag direction
            if (absDeltaX > absDeltaY && absDeltaX > 10) {
              setSprite(deltaX > 0 ? 'scratchWallW' : 'scratchWallE', frameCount);
            } else if (absDeltaY > absDeltaX && absDeltaY > 10) {
              setSprite(deltaY > 0 ? 'scratchWallN' : 'scratchWallS', frameCount);
            }
        
            if (grabStop || absDeltaX > 10 || absDeltaY > 10 || Math.sqrt(deltaX ** 2 + deltaY ** 2) > 10) {
              grabStop = false;
              clearTimeout(grabInterval);
              grabInterval = setTimeout(() => {
                grabStop = true;
                nudge = false;
                startX = e.clientX || e.touches[0].clientX;
                startY = e.clientY || e.touches[0].clientY;
                startNekoX = nekoPosX;
                startNekoY = nekoPosY;
              }, 150);
            }
        
            nekoPosX = startNekoX + deltaX;
            nekoPosY = startNekoY + deltaY;
            nekoEl.style.left = `${nekoPosX - 16}px`;
            nekoEl.style.top = `${nekoPosY - 16}px`;
          };
        
          const end = () => {
            grabbing = false;
            nekoEl.style.cursor = 'grab';
            nudge = true;
            resetIdleAnimation();
            window.removeEventListener('mousemove', move);
            window.removeEventListener('mouseup', end);
            window.removeEventListener('touchmove', move);
            window.removeEventListener('touchend', end);
          };
        
          window.addEventListener('mousemove', move);
          window.addEventListener('mouseup', end);
          window.addEventListener('touchmove', move);
          window.addEventListener('touchend', end);
        }        

        window.onekoInterval = setInterval(frame, 100);
      }

      function sleep() {
        forceSleep = !forceSleep;
        isCatFixed = forceSleep;
        nudge = false;

        localStorage.setItem('oneko:forceSleep', forceSleep);
        if (!forceSleep) {
          resetIdleAnimation();
          return;
        }
      }

      function setSprite(name, frame) {
        const sprite = spriteSets[name][frame % spriteSets[name].length];
        nekoEl.style.backgroundPosition = `${sprite[0] * 32}px ${sprite[1] * 32}px`;
      }

      function resetIdleAnimation() {
        idleAnimation = null;
        idleAnimationFrame = 0;
      }

      function idle() {
        idleTime += 0.5; // Increment the idle time by 0.5 every time idle() is called

        if (idleTime >= 5 && Math.random() < 0.5 && idleAnimation === null) {
          const availableIdleAnimations = ['scratchSelf', 'tired'];
          idleAnimation = availableIdleAnimations[Math.floor(Math.random() * availableIdleAnimations.length)];
        } else if (idleTime >= 50) {
          const availableIdleAnimations = 'sleeping';
          idleAnimation = availableIdleAnimations;
        }
        if (forceSleep) {
          const availableIdleAnimations = 'sleeping';
          idleAnimation = availableIdleAnimations;
        }

        switch (idleAnimation) {
          case 'sleeping':
            if (idleAnimationFrame < 8) {
              setSprite('tired', 0);
            } else {
              setSprite('sleeping', Math.floor(idleAnimationFrame / 4));
            }
            break;
          case 'scratchSelf':
          case 'tired':
            if (Math.random() < 0.5) {
              setSprite(idleAnimation, idleAnimationFrame);
            }
            if (idleAnimationFrame > 20) {
              setSprite('idle', 0);
            }
            break;
          default:
            setSprite('idle', 0);
            break;
        }
        idleAnimationFrame += 1; // Increment idleAnimationFrame
      }

      function frame() {
        frameCount += 1;
        targetX = window.innerWidth * 0.5;
        let diffX, diffY;
        if (isCatFixed) {
          diffX = nekoPosX - targetX;
          diffY = nekoPosY - targetY;
        } else {
          diffX = nekoPosX - mousePosX;
          diffY = nekoPosY - mousePosY;
        }
        const distance = Math.sqrt(diffX ** 2 + diffY ** 2);

        if (distance < nekoSpeed || distance < 48) {
          idle();
          return;
        }

        idleAnimation = null;
        idleAnimationFrame = 0;

        if (idleTime > 1) {
          setSprite('alert', 0);
          // count down after being alerted before moving
          idleTime = Math.min(idleTime, 7);
          idleTime -= 1;
          return;
        }

        let direction;
        direction = diffY / distance > 0.5 ? 'N' : '';
        direction += diffY / distance < -0.5 ? 'S' : '';
        direction += diffX / distance > 0.5 ? 'W' : '';
        direction += diffX / distance < -0.5 ? 'E' : '';
        setSprite(direction, frameCount);

        nekoPosX -= (diffX / distance) * nekoSpeed;
        nekoPosY -= (diffY / distance) * nekoSpeed;

        nekoPosX = Math.min(Math.max(16, nekoPosX), window.innerWidth - 16);
        nekoPosY = Math.min(Math.max(16, nekoPosY), window.innerHeight - 16);

        nekoEl.style.left = `${nekoPosX - 16}px`;
        nekoEl.style.top = `${nekoPosY - 16}px`;
      }

      init();
    })();
  }, []);

  return null; // The component doesn't render anything itself
};

export default Neko;
