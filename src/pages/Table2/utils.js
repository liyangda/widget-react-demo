import React from 'react';

import { autorun, observable, reaction, toJS } from 'mobx';

export function toObservable(target) {
  if (Array.isArray(target)) {
    return target.map((item) => observable(item));
  }

  return observable(target);
}

export function toJavaScript(target) {
  if (Array.isArray(target)) {
    return target.map((item) => toJS(item));
  }

  return toJS(target);
}

export function toReaction(data, effect) {
  return reaction(data, effect);
}

export function toAutorun(effect) {
  return autorun(effect);
}

export function useFreeze(target) {
  return React.useMemo(() => {
    if (Array.isArray(target)) {
      return target.map((item) => Object.freeze(item));
    }
  
    return Object.freeze(target);
  }, [target]);
}

export function useObservable(target) {
  return React.useMemo(() => {
    if (Array.isArray(target)) {
      return target.map((item) => observable(item));
    }
  
    return observable(target);
  }, [target]);
}

export function useReaction(data, effect) {
  const dispose = React.useRef();

  React.useEffect(() => {
    dispose.current = reaction(data, effect);

    return () => dispose.current();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return dispose.current;
}

export function useAutorun(effect) {
  const dispose = React.useRef();

  React.useEffect(() => {
    dispose.current = autorun(effect);

    return () => dispose.current();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return dispose.current;
}

export function database2kafka(source) {
  if (Array.isArray(source)) {
    return source.map(({ name }) => ({
      sourcePath: name,
      alias: '',
      format: '',
      defaultValue: '',
    }));
  }

  return {
    sourcePath: source.name,
    alias: '',
    format: '',
    defaultValue: '',
  }
}

export function kafka2database(source) {
  if (Array.isArray(source)) {
    return source.map(({ sourcePath }) => ({
      name: sourcePath,
      type: '',
    }));
  }

  return {
    name: source.sourcePath,
    type: '',
  };
}

export { action, runInAction } from 'mobx';
