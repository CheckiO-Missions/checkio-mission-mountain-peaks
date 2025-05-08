requirejs(['ext_editor_io2', 'jquery_190', 'raphael_210'],
    function (extIO, $) {
        function mountain_peaks_visualization(tgt_node, data) {
            /**
             * attr
             */
            const attr = {
                'bar' : {
                    'slope' : {
                        'stroke-width': 0,
                        'fill': '#82D1F5',
                    },
                    'peak' : {
                        'stroke-width': 0,
                        'fill': '#006CA9',
                    }
                },
                'input_number': {
                    'font-size': '10px',
                    'font-family': 'Times',
                    'font_weight': 'bold',
                    'fill': '#006CA9',
                },
                'base_line': {
                    'stroke-width': '0.5px',
                    'fill': '#006CA9',
                }
            }
            /**
             * values
             */
            const input = data.in[0]
            const max_view_size = 200
            const os = 10
            const h_space = 2
            const input_max_value = Math.max(...input)
            const h_unit = Math.min(9, max_view_size / input.length)
            const v_unit = Math.min(9, max_view_size / input_max_value)
            const font_size = h_unit
            const grid_seize_px_h = Math.min(max_view_size, h_unit * input.length) + os * 2
            const grid_seize_px_v = v_unit * input_max_value + font_size + os * 2
            attr.input_number['font-size'] = font_size + 'px'
            if (input.length === 0) {
                return
            }
            /**
             * paper
             */
            const paper = Raphael(tgt_node, grid_seize_px_h, grid_seize_px_v)
            /**
             * get peaks
             */
            const peaks = []
            input.forEach((inp, idx)=>{
                let slopes = input.slice(Math.max(0, idx-1), Math.min(input.length, idx-1+3))
                if (Math.max(...slopes) === inp) {
                    peaks.push(idx)
                }
            })
            /**
             * draw bars
             */
            input.forEach((inp, idx) => {
                paper.rect(
                    idx * h_unit + h_space / 2 +  os,
                    (input_max_value - inp) * v_unit + os,
                    h_unit - h_space,
                    inp * v_unit
                ).attr(peaks.includes(idx) ? attr.bar.peak : attr.bar.slope)
                paper.text(
                    idx * h_unit + font_size / 2 +  os,
                    (input_max_value) * v_unit + font_size + os,
                    inp
                ).attr(attr.input_number)
            })
            /**
             * draw base-line
             */
            paper.path([
                'M',
                os / 2,
                input_max_value * v_unit + os + 2,
                'h',
                h_unit * input.length + os
            ]).attr(attr.base_line)
        }
        var io = new extIO({
            animation: function ($expl, data) {
                mountain_peaks_visualization(
                    $expl[0],
                    data,
                );
            }
        });
        io.start();
    }
);
