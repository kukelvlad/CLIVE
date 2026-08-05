import { useState, type ReactNode } from 'react';
import { Dimensions, StyleSheet, View, type LayoutChangeEvent } from 'react-native';

export interface BoundedGridProps {
  cols: number;
  rows: number;
  /** Max height as a percentage of window height, matching web's `maxVh` (default 46). */
  maxVh?: number;
  gap?: number;
  children: ReactNode[];
  accessibilityLabel?: string;
}

/**
 * Grid that stays within the viewport on short screens, ported from web's
 * `BoundedGrid`. Web used CSS `aspect-ratio` + `maxHeight: ${maxVh}vh` on the
 * wrapper — RN has no CSS Grid and no vh units, so this measures the
 * available width via `onLayout`, derives a height from cols/rows aspect
 * ratio, clamps it to `maxVh`% of `Dimensions.get('window').height`, and
 * lays out cells as flex rows instead of `display:grid`.
 */
export function BoundedGrid({
  cols,
  rows,
  maxVh = 46,
  gap = 10,
  children,
  accessibilityLabel,
}: BoundedGridProps) {
  const [width, setWidth] = useState(0);

  function onLayout(e: LayoutChangeEvent) {
    setWidth(e.nativeEvent.layout.width);
  }

  const windowHeight = Dimensions.get('window').height;
  const maxHeight = (maxVh / 100) * windowHeight;
  const aspectHeight = width > 0 ? (width * rows) / cols : 0;
  const gridHeight = Math.min(aspectHeight, maxHeight);
  const gridWidth = aspectHeight > maxHeight ? (gridHeight * cols) / rows : width;

  const cellWidth = gridWidth > 0 ? (gridWidth - gap * (cols - 1)) / cols : 0;
  const cellHeight = gridHeight > 0 ? (gridHeight - gap * (rows - 1)) / rows : 0;

  const rowsOfChildren: ReactNode[][] = [];
  for (let r = 0; r < rows; r++) {
    rowsOfChildren.push(children.slice(r * cols, r * cols + cols));
  }

  return (
    <View style={styles.outer} onLayout={onLayout}>
      <View
        accessibilityRole="none"
        accessibilityLabel={accessibilityLabel}
        style={[styles.grid, { width: gridWidth || undefined, height: gridHeight || undefined, gap }]}
      >
        {rowsOfChildren.map((rowChildren, rowIndex) => (
          <View key={rowIndex} style={[styles.row, { gap }]}>
            {rowChildren.map((child, colIndex) => (
              <View key={colIndex} style={{ width: cellWidth, height: cellHeight }}>
                {child}
              </View>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    width: '100%',
    alignItems: 'center',
  },
  grid: {
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
  },
});
