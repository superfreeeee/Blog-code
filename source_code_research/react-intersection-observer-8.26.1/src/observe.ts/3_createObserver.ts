const ObserverMap = new Map<
  string,
  {
    id: string;
    observer: IntersectionObserver;
    elements: Map<Element, Array<ObserverInstanceCallback>>;
  }
>();

function createObserver(options: IntersectionObserverInit) {
  // optionID 唯一标识 Observer 实例
  let id = optionsToId(options);
  let instance = ObserverMap.get(id);

  if (!instance) {
    // 不存在 => 创建一个新的
    const elements = new Map<Element, Array<ObserverInstanceCallback>>();
    let thresholds: number[] | readonly number[];

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        // 计算是否出现 inView
        const inView = entry.isIntersecting && thresholds.some((threshold) => entry.intersectionRatio >= threshold);

        // trackVisibility 决定是否使用 isVisible
        if (options.trackVisibility && typeof entry.isVisible === 'undefined') {
          entry.isVisible = inView;
        }

        // 调用回调
        elements.get(entry.target)?.forEach((callback) => {
          callback(inView, entry);
        });
      });
    }, options);

    // thresholds 参数
    thresholds =
      observer.thresholds || (Array.isArray(options.threshold) ? options.threshold : [options.threshold || 0]);

    // 创建实例（id、observer、观察目标）
    instance = {
      id,
      observer,
      elements,
    };

    ObserverMap.set(id, instance);
  }

  return instance;
}
