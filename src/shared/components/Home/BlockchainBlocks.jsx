import styles from './BlockchainBlocks.module.scss';

const BlockchainBlocks = () => {
  return (
    <div className={styles.blocksWrapper}>
      <svg
        viewBox="0 0 400 200"
        className={styles.blocksSvg}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="blockGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.2" />
          </linearGradient>
          <filter id="blockGlow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Connection lines between blocks */}
        <line x1="50" y1="100" x2="200" y2="100" stroke="#ffffff" strokeWidth="1" opacity="0.3" strokeDasharray="3,3" />
        <line x1="200" y1="100" x2="350" y2="100" stroke="#ffffff" strokeWidth="1" opacity="0.3" strokeDasharray="3,3" />

        {/* Block 1 (Left) */}
        <g transform="translate(50, 100)">
          <g className={`${styles.innerBlock} ${styles.delay1}`}>
            <rect x="-50" y="-50" fill="none" width="100" height="100" />
            <path d="M 0,-40 L 35,-20 L 0,0 L -35,-20 Z" stroke="#ffffff" fill="url(#blockGrad)" strokeWidth="1.5" />
            <path d="M -35,-20 L -35,20 L 0,40 L 0,0 Z" stroke="#ffffff" fill="black" strokeWidth="1.5" filter="url(#blockGlow)" />
            <path d="M 35,-20 L 35,20 L 0,40 L 0,0 Z" stroke="#ffffff" fill="black" strokeWidth="1.5" filter="url(#blockGlow)" />
          </g>
        </g>
        <ellipse cx="50" cy="100" rx="45" ry="18" fill="none" stroke="#555555" strokeWidth="0.8" opacity="0.4" strokeDasharray="4,4" />

        {/* Block 2 (Center) */}
        <g transform="translate(200, 100)">
          <g className={`${styles.innerBlock} ${styles.delay2}`}>
            <rect x="-50" y="-50" fill="none" width="100" height="100" />
            <path d="M 0,-40 L 35,-20 L 0,0 L -35,-20 Z" stroke="#ffffff" fill="url(#blockGrad)" strokeWidth="1.5" />
            <path d="M -35,-20 L -35,20 L 0,40 L 0,0 Z" stroke="#ffffff" fill="black" strokeWidth="1.5" filter="url(#blockGlow)" />
            <path d="M 35,-20 L 35,20 L 0,40 L 0,0 Z" stroke="#ffffff" fill="black" strokeWidth="1.5" filter="url(#blockGlow)" />
          </g>
        </g>
        <ellipse cx="200" cy="100" rx="45" ry="18" fill="none" stroke="#555555" strokeWidth="0.8" opacity="0.4" strokeDasharray="4,4" />

        {/* Block 3 (Right) */}
        <g transform="translate(350, 100)">
          <g className={`${styles.innerBlock} ${styles.delay3}`}>
            <rect x="-50" y="-50" fill="none" width="100" height="100" />
            <path d="M 0,-40 L 35,-20 L 0,0 L -35,-20 Z" stroke="#ffffff" fill="url(#blockGrad)" strokeWidth="1.5" />
            <path d="M -35,-20 L -35,20 L 0,40 L 0,0 Z" stroke="#ffffff" fill="black" strokeWidth="1.5" filter="url(#blockGlow)" />
            <path d="M 35,-20 L 35,20 L 0,40 L 0,0 Z" stroke="#ffffff" fill="black" strokeWidth="1.5" filter="url(#blockGlow)" />
          </g>
        </g>
        <ellipse cx="350" cy="100" rx="45" ry="18" fill="none" stroke="#555555" strokeWidth="0.8" opacity="0.4" strokeDasharray="4,4" />
      </svg>
    </div>
  );
};

export default BlockchainBlocks;
