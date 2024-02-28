import { ActionWithFeature } from '@/types/collection';

interface SeparatedFeatures {
  [featureName: string]: ActionWithFeature[];
}

export function separateByFeature(
  featureActions: ActionWithFeature[]
): SeparatedFeatures {
  const separated: SeparatedFeatures = {};

  featureActions.forEach(({ id, feature, actionType }) => {
    const featureName = feature.Name;
    if (!separated[featureName]) {
      separated[featureName] = [];
    }
    separated[featureName].push({ id, actionType, feature });
  });

  return separated;
}
