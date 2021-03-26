package com.example.builder.graph;

/**
 * HTML 2D图像生成器
 */
public interface GraphBuilder {

    /**
     * 初始化
     *
     * @return
     */
    GraphBuilder init();

    /**
     * 添加新的分组
     *
     * @param id
     * @return
     */
    GraphBuilder group(String id);

    default GraphBuilder group() {
        group(null);
        return this;
    }

    /**
     * 结束当前分组
     *
     * @return
     */
    GraphBuilder groupEnd();

    /**
     * 添加矩形
     *
     * @param x
     * @param y
     * @param rx
     * @param ry
     * @param width
     * @param height
     * @param style
     * @return
     */
    GraphBuilder addRect(int x, int y, int rx, int ry, int width, int height, String[] style);

    /**
     * 添加圆形
     *
     * @param cx
     * @param cy
     * @param r
     * @param style
     * @return
     */
    GraphBuilder addCircle(int cx, int cy, int r, String[] style);

    /**
     * 添加直线
     *
     * @param x1
     * @param y1
     * @param x2
     * @param y2
     * @param style
     * @return
     */
    GraphBuilder addLine(int x1, int y1, int x2, int y2, String[] style);

    /**
     * 生成最终结果
     *
     * @return
     */
    String build();

    /**
     * 可视化结果
     */
    void check();
}
