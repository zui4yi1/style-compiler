const animate = `
/** spin */
@keyframes spin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

/** delay some time to show */
@keyframes delayShow {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
`

module.exports = {
    animate,
  };
  