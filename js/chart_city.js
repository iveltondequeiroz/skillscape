/**  -------------------------------------------------------------------------   **/
/**
 * Method used to load the page and get the data from JSON.
 *
 * @version   0.0.1
 * @since     0.0.1
 * @access    public
 * @author    
 */

$(document).ready(function () {


    var chartContainerClass = '.graph-wrapper';
    var chartData;
    var mainData

    var Parameter = $(window).width() > 992 ? '#parameters' : '#parameters2';
    var ColorSelection = $(window).width() > 992 ? "#color-selection" : "#color-selection2";
    var OptionSelected = $(Parameter + " " + "option[value=job]").attr('selected', true);
    var valueSelected = $(OptionSelected).val();
    var ColorSelection = $(window).width() > 992 ? "#color-selection" : "#color-selection2";
    var ColorOtion = $(ColorSelection + " " + "option[value=job]").attr('selected', true);
    var SelectedColor = $(ColorOtion).val();
    var width = $('.graph-wrapper').width();
    $.getJSON("json files/1.json", function (k, v) {
        format: "json"
    })
            .done(function (data) {
                mainData = data.nodes;
                $(Parameter).change(function (e) {
                    chartData = jQuery.extend([], mainData)
                    valueSelected = $(this).find("option:selected").val();
                    if (valueSelected == "job") {
//                        chartData.sort(function (a, b) {
//                            return (a.group > b.group) ? 1 : ((b.group > a.group) ? -1 : 0);
//                        });
                        if (on == 0) {
                            var ColorOtion = $(ColorSelection + " " + "option[value=prob]").attr('selected', true);
                            var SelectedColor = $(ColorOtion).val();
                            if (SelectedColor) {
                                SelectedColor = $(ColorSelection).find('option:selected').val();
                            }
                        } else {
                            SelectedColor = $(ColorSelection).find('option:selected').val();
                        }
//                        
                        $("#graph2").remove();
                        RenderChart(chartContainerClass, chartData, SelectedColor, valueSelected);
                        $('#graph2').css('display', 'block');
                    } else if (valueSelected == "comp") {
                        chartData.sort(function (m, n) {
                            return (m["complexity"] - n["complexity"])
                        })
                        if (on == 0) {
                            var ColorOtion = $(ColorSelection + " " + "option[value=prob]").attr('selected', true);
                            var SelectedColor = $(ColorOtion).val();
                            if (SelectedColor) {
                                SelectedColor = $(ColorSelection).find('option:selected').val();
                            }
                        } else {
                            SelectedColor = $(ColorSelection).find('option:selected').val();
                        }
//                        
                        $("#graph2").remove();
                        RenderChart(chartContainerClass, chartData, SelectedColor, valueSelected);
                        $('#graph2').css('display', 'block');
                    } else if (valueSelected == "prob") {
                        chartData.sort(function (m, n) {
                            return (m["p_auto"] - n["p_auto"])
                        })
//                        ColorPatternForAutomation(ColorData, valueSelected)
                        if (on == 0) {
                            var ColorOtion = $(ColorSelection + " " + "option[value=prob]").attr('selected', true);
                            var SelectedColor = $(ColorOtion).val();
                            if (SelectedColor) {
                                SelectedColor = $(ColorSelection).find('option:selected').val();
                            }
                        } else {
                            SelectedColor = $(ColorSelection).find('option:selected').val();
                        }
//                        
                        $("#graph2").remove();
                        RenderChart(chartContainerClass, chartData, SelectedColor, valueSelected);
                        $('#graph2').css('display', 'block');
                    }
                    e.stopImmediatePropagation()
                })
                $(ColorSelection).change(function (e) {
                    SelectedColor = $(this).find("option:selected").val();
                    d3.selectAll('.bar').each(function (d) {
                        if (SelectedColor == "prob") {
                            if (d.p_auto < 0) {
                                $(this).css("fill", "#2c25fb");
                            } else if (d.p_auto > 0 && d.p_auto < 0.4) {
                                $(this).css("fill", "#6d68f7");
                            } else if (d.p_auto > 0.35 && d.p_auto < 0.45) {
                                $(this).css("fill", "#adabf2");
                            } else if (d.p_auto > 0.45 && d.p_auto < 0.50) {
                                $(this).css("fill", "#eeeeee");
                            } else if (d.p_auto > 0.5 && d.p_auto < 0.55) {
                                $(this).css("fill", "#f4b0b0");
                            } else if (d.p_auto > 0.55 && d.p_auto < 0.58) {
                                $(this).css("fill", "#f97171");
                            } else if (d.p_auto > 0.58) {
                                $(this).css("fill", "#ff3333");
                            }
                            $("#svglegend").remove();
                            DrawLegend();
                        } else if (SelectedColor == "comp") {
                            if (d.complexity > -2.05 && d.complexity < -1.5) {
                                $(this).css("fill", "#1c5046");
                            } else if (d.complexity > -1.5 && d.complexity < -1.0) {
                                $(this).css("fill", "#38a08c")

                            } else if (d.complexity > -1.0 && d.complexity < 0) {
                                $(this).css("fill", "#3fb49d")

                            } else if (d.complexity > 0 && d.complexity < 0.5) {
                                $(this).css("fill", "#47c9af")

                            } else if (d.complexity > 0.5 && d.complexity < 0.65) {
                                $(this).css("fill", "#a3e4d7")

                            } else if (d.complexity > 0.6 && d.complexity < 0.75) {
                                $(this).css("fill", "#b5e9df")
                                return "";
                            } else if (d.complexity > 0.75) {
                                $(this).css("fill", "#daf4ef")

                            }
                            $("#svglegend").remove();
                            ComplexityLegend();
                        } else if (SelectedColor == "none") {
                            $("#svglegend").remove();
                            $(this).css("fill", "steelblue")
                        } else {
                            $(this).css("fill", function () {
                                return d.scolor;
                            })
                            $("#svglegend").remove();
                            CityDefaultLegend()
                        }

                    });
                    e.stopImmediatePropagation()
                })
                RenderChart(chartContainerClass, chartData, SelectedColor, valueSelected);
            })

    SwitchingChart(chartData);
});
/**  -------------------------------------------------------------------------   **/
/**
 * Method used to Create the chart acoording to the class and data provided from JSON
 *
 * @version   0.0.1
 * @since     0.0.1
 * @access    public
 * @author    
 */

function RenderChart(chartContainerClass, chartData, SelectedColor, valueSelected) {

    //    Process to calculate the margins of the chart and declaration height and width.
    var margin = {top: 0, right: 50, bottom: 30, left: 70};
    var borderwidth = $(window).width() > 992 ? $(window).width() / 5 : 100;
    var borderheight = $(window).width() > 992 ? $(window).width() / 5 : 50;
    if ($(window).width() < 992) {
        var width = ($('.graph-wrapper').width()) + 40;
    } else {
        width = $('.graph-wrapper').width();
    }
    var height = $(window).width() > 992 ? ($(window).height()) * 0.8 : ($(window).height()) * 0.5;
    //Process to create axis of the chart on the basis of type of the value.
    var x = d3.scale.ordinal()
            .rangeBands([0, (width)], 0.4);
    var y = d3.scale.linear()
            .range([height, 0]);
    y.domain([0, d3.max(chartData, function (f) {
            return (parseFloat(f.rca * 1.1));
        })]);
    var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");
    var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left");
    // Process of creating tooltip with name , RCA,complexity and probability parameter   
    var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function (d) {
            icon="none";
            for (i = 0; i < iconobjs.length; i++) {
                if(iconobjs[i].key==d.group.replace(/\s+/g, '')){
                    icon=iconobjs[i].icon;
                }
            }
            risk=d.p_auto.toString();
            styles="padding-bottom:2px;vertical-align:middle;color:"+d.scolor;
            return "&ensp;<i class='fa "+icon+" fa-2x' style="+styles+"></i>&ensp;<strong  style='color:black'>" + d.group.toUpperCase()+"</strong'>" 
                    +"<br><pre>&ensp;"+d.name.toUpperCase()+"</pre>"
                    +"<strong style='color:black'>&ensp;RCA : "+d.rca.substring(0, 6) 
                    +"<br>&ensp;Complexity : "+d.complexity.substring(0, 6)
                    +"<br>&ensp;Risk of Automation : "+risk.substring(0, 6)
                    +"</strong>";
        });

    //Creation of the svg with proper style consideration. 
    var svg = d3.select(chartContainerClass).append("div").attr('id', 'graph2').append("svg")
            .attr("width", width)
            .attr("height", height)
            .style("margin-bottom", "40px")
            .style("background-color", "#f9f9f9")
            .style("border-radius","2px")
            .style("border","solid 1px #aaa")
            .append("g")
            .attr("transform", "translate(" + (margin.left) + "," + (margin.top - 25) + ")");
    svg.call(tip);
    //Declaration of the domain of the axis

    //Appending the axis in the svg
    svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .append("text")
            .attr("y", 20)
            .style("font-size", "11px")
            .style("text-align", "center")
            .style("font-family", "'Raleway', sans-serif")
            .attr("x", function () {
                if (valueSelected == "prob" || valueSelected == "comp") {
                    if ($(window).width() < 992) {
                        return (70);
                    } else {
                        return (height - 300);
                    }
                } else
                    return (height - 200)
            })
            .append("tspan")
            .html(function () {
                if (valueSelected == "comp") {
                    var label;
                    label = "Low &#8592;Skills Complexity&#8594;High";
//                    label=($.parseHTML(label))

//                     ($(".tick text").append(label))
                    return label;
                } else if (valueSelected == "prob") {
                    var label;
                    label = "Low &#8592;Skills Risk of Automation&#8594;High";
                    return  label;
                }
                return "Skills";
            });
    svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0)
            .attr("dy", "-2.51em")
            .attr("dx", function () {
                if ($(window).width() < 992) {
                    return ("-160");
                } else {
                    return ("-225");
                }
            })
            .style("font-family", "'Raleway', sans-serif")
            .style("font-size", "11px")
            .style("text-anchor", "end")
            .text("RCA");
    //////////////////////////////Drawing Chart Here////////////////////////////////////

    x.domain(chartData.map(function (f) {
        return f.name;
    }));
    y.domain([0, d3.max(chartData, function (f) {
            return (parseFloat(f.rca * 1.1));
        })]);
    //Formation of the bar of the chart
    svg.selectAll(".bar")
            .data(chartData)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", function (f) {
                return x(f.name);
            })
            .attr("width", x.rangeBand())
            .attr("y", function (f) {

                return y(f.rca);
            })
            .attr("height", function (f) {
                return height - y(f.rca);
            })

            //Alloting color on the basis of the color range as provided
            .style("fill", function (f) {
//                    var SelectedColor = $('#color-selection').find('option:selected').val();
                if (SelectedColor == "prob") {
                    if (f.p_auto < 0) {
                        return "#2c25fb";
                    } else if (f.p_auto > 0 && f.p_auto < 0.4) {
                        return "#6d68f7";
                    } else if (f.p_auto > 0.35 && f.p_auto < 0.45) {
                        return "#adabf2";
                    } else if (f.p_auto > 0.45 && f.p_auto < 0.50) {
                        return "#eeeeee";
                    } else if (f.p_auto > 0.5 && f.p_auto < 0.55) {
                        return "#f4b0b0";
                    } else if (f.p_auto > 0.55 && f.p_auto < 0.58) {
                        return "#f97171";
                    } else if (f.p_auto > 0.58) {
                        return "#ff3333";
                    }
                } else if (SelectedColor == "comp") {
                    if (f.complexity > -2.05 && f.complexity < -1.5) {
                        return "#1c5046";
                    } else if (f.complexity > -1.5 && f.complexity < -1.0) {
                        return   "#38a08c";
                    } else if (f.complexity > -1.0 && f.complexity < 0) {
                        return "#3fb49d";
                    } else if (f.complexity > 0 && f.complexity < 0.5) {
                        return "#47c9af";
                    } else if (f.complexity > 0.5 && f.complexity < 0.65) {
                        return "#a3e4d7";
                    } else if (f.complexity > 0.6 && f.complexity < 0.75) {
                        return "#b5e9df";
                    } else if (f.complexity > 0.75) {
                        return "#daf4ef";
                    }
                } else if (SelectedColor == "none") {

                    return "steelblue";
                } else {
                    return f.scolor;
                }

            })
            .on('mouseover', tip.show)
            .on('mouseout', tip.hide)
            //Hiding the x axis text for the chart
            .attr("height", 0)
            .transition()
            .duration(5)
            .delay(function (d, i) {
                return i * 5;
            })
            .attr("y", function (d) {
                return  y(d.rca);
            })
            .attr("height", function (d) {
                return height - y(d.rca);
            });
//                        he height, because y's domain is bottom up, but SVG renders top down


}
////////////////////////////////////////////////////////////////////////////////////////////


/**  -------------------------------------------------------------------------   **/
/**
 * Method used to switch the chart between bar chart and forced layout and their options
 *
 * @version   0.0.1
 * @since     0.0.1
 * @access    public
 * @author    
 */

on2 = 0;
function SwitchingChart(chartData) {
    var width = $('.main-wrapper').width();
    $(document).on("click", "#toggle_chart", function () {


        UpdateChart();
        d3.csv("data_generating/bedoor_rca_cities.csv", function (error, data) {
            countryname = data;
            RandomCategories(data);
            SearchJobs(data)
        })
        var random = $(window).width() > 992 ? '#random1' : '#random2'
        var ParameterMain = $(window).width() > 992 ? ".job-parameter-wrapper" : ".job-parameter-wrapper2";
        var MainColorSelection = $(window).width() > 992 ? ".job-color-wrapper" : ".job-color-wrapper2";
        var Parameter = $(window).width() > 992 ? '#parameters' : '#parameters2';
        var ColorSelection = $(window).width() > 992 ? "#color-selection" : "#color-selection2";
        if (on2) {
            on2 = 0;
        } else {
            on2 = 1;
        }
        if (on2) {
            $("#svglegend").remove();
            CityDefaultLegend();
            $(this).addClass('active');
            $('div #graph1').css('display', 'none');
            $(".auto-btn").css("opacity", "0");
            $(".auto-btn").css("height", "0");
            $(".auto2").css("opacity", "0");
            $(".auto2").css("height", "0");
            $("#allplot2").css("display", "none");
            $("#allplot3").css("display", "block");
            $("#svglegend").css("display", "block");
            $('#graph2').css('display', 'block');
            $(ParameterMain).css("display", "block");
            $(MainColorSelection).css("display", "block");
            $(random).css('display', 'none');
            $('.random-selection').css('display', 'block');
            if (on == 0) {
                $.getJSON("json files/1.json", function (k, v) {
                    format: "json"
                })
                        .done(function (data) {
                            var chartData = data.nodes;
                            var ColorOtion = $(ColorSelection + " " + "option[value=prob]").prop('selected', true);
                            var SelectedColor = $(ColorOtion).val();
                            var OptionSelected = $(Parameter + " " + "option[value=prob]").prop('selected', true);
                            var valueSelected = $(OptionSelected).val();
//                            var Parameter = $(window).width() > 992 ? '#parameters' : '#parameters2';
                            var chartContainerClass = ".graph-wrapper";
                            chartData.sort(function (m, n) {
                                return (m["p_auto"] - n["p_auto"])
                            })
                            $("#graph2").remove();
                            RenderChart(chartContainerClass, chartData, SelectedColor, valueSelected);
                            $('#graph2').css('display', 'block');
                            $("#svglegend").remove();
                            DrawLegend();
                        });
            } else if (on == 1) {
                $.getJSON("json files/1.json", function (k, v) {
                    format: "json"
                })
                        .done(function (data) {
                            var chartData = data.nodes;
                            var ColorOtion = $(ColorSelection + " " + "option[value=job]").prop('selected', true);
                            var SelectedColor = $(ColorOtion).val();
                            var OptionSelected = $(Parameter + " " + "option[value=job]").prop('selected', true);
                            var valueSelected = $(OptionSelected).val();
                            var chartContainerClass = ".graph-wrapper";
                            $("#graph2").remove();
                            RenderChart(chartContainerClass, chartData, SelectedColor, valueSelected);
                            $('#graph2').css('display', 'block');
                        });
            }
        }
        if (!on2) {
            $(this).removeClass('active');
            $('div #graph1').css('display', 'block');
            $(".auto-btn").css("opacity", "1");
            $(".auto-btn").css("height", "auto");
            $(".auto2").css("opacity", "1");
            $(".auto2").css("height", "auto");
            $("#allplot2").css("display", "block");
            $("#allplot3").css("display", "none");
            $("#svglegend").css("display", "none");
            $('#graph2').css('display', 'none');
            $(ParameterMain).css("display", "none");
            $(MainColorSelection).css("display", "none");
            $(random).css('display', 'block');
            $('.random-selection').css('display', 'none');
        }
    });
}

function DrawLegend() {
    function getContainer() {
        if ($(window).width() > 500) {
            return ("#allplot3");
        }
        $('#allplot3').remove();
        return ('.main-wrapper');
    }

    var legendConatiner = getContainer();
    if (legendConatiner == ".main-wrapper") {
        var svg = d3.select(legendConatiner).append("svg")
                .attr("id", "svglegend")
                .attr("width", width)
                .attr("height", 80);
    } else {
        var svg = d3.select(legendConatiner).append("svg")
                .attr("id", "svglegend")
                .attr("width", width)
                .attr("height", 185);
    }
    $('#allplot3').css({
        "position": 'relative',
        "bottom": '0px'
    })
    var width = $('.main-wrapper').width() - 30;
    var legenddata = [{
            "Group": "High Risk",
            "color": 0.67
        }, {
            "Group": "",
            "color": 0.62
        }, {
            "Group": "",
            "color": 0.57
        }, {
            "Group": "Neutral",
            "color": 0.52
        }, {
            "Group": "",
            "color": 0.47
        }, {
            "Group": "",
            "color": 0.42
        }, {
            "Group": "Low Risk",
            "color": 0.37
        }]


    var legend = svg.selectAll(".legend")
            .data(legenddata)
            .enter().append("rect")
            .attr("class", "legend")
            .attr("fill", function (d) {
                return color(d.color)
            })


    var textLegend = svg.selectAll(".legendtext")
            .data(legenddata)
            .enter().append("text")
            .attr("class", "legendtext")

            .text(function (d) {
                return d.Group
            })

    var titlelegend = svg.selectAll(".legendtitle")
            .data(["Risk of Automation"])
            .enter().append("text")
            .attr("class", "legendtitle")
            .style("font-weight", "bold")
            .text("Risk of Automation :")
    if ($(window).width() > 992) {
        legend
                .attr("x", function (d, i) {
                    return 0;
                })
                .attr("y", function (d, i) {
                    return 40 + i * 20;
                })
                .attr("width", 10)
                .attr("height", 20)

        textLegend.attr("x", function (d, i) {
            return 20;
        })
                .attr("y", function (d, i) {
                    return 55 + i * 20;
                })
        //.style("font-size", '14px')

        titlelegend.attr("x", 0)
                //.style("font-size", "14px")
                .attr("y", 15)
    } else {


        var ssift = 100;
        if ($(window).width() > 767) {
            ssift = 170;
        }

        legend
                .attr("width", width / 20)
                .attr("height", 10)
                .attr("x", function (d, i) {
                    return 0 + i * width / 20 + ssift;
                })
                .attr("y", function (d, i) {
                    return 10;
                })

        textLegend
                .attr("transform", function (d, i) {
                    return "translate(" + (i * width / 20 + (width / 2.5) / 20 + ssift) + ",28)rotate(35)";
                })
        //.style("font-size", "7px")




        titlelegend.attr("x", -1)
                //.style("font-size", "10px")
                .attr("y", 18)
    }

}

function ComplexityLegend() {
    function getContainer() {
        if ($(window).width() > 500) {
            return ("#allplot3");
        }
        $('#allplot3').remove();
        return ('.main-wrapper');
    }

    var legendConatiner = getContainer();
    if (legendConatiner == ".main-wrapper") {
        var svg = d3.select(legendConatiner).append("svg")
                .attr("id", "svglegend")
                .attr("width", width)
                .attr("height", 80);
    } else {
        var svg = d3.select(legendConatiner).append("svg")
                .attr("id", "svglegend")
                .attr("width", width)
                .attr("height", 185);
    }
    var Complegenddata = [{
            "Group": "High Complexity",
            "color": "#daf4ef"
        }, {
            "Group": "",
            "color": "#b5e9df"
        }, {
            "Group": "",
            "color": "#a3e4d7"
        }, {
            "Group": "Neutral",
            "color": "#47c9af"
        }, {
            "Group": "",
            "color": "#3fb49d"
        }, {
            "Group": "",
            "color": "#38a08c"
        }, {
            "Group": "Low Complexity",
            "color": "#1c5046"
        }]
    var legend = svg.selectAll(".legend")
            .data(Complegenddata)
            .enter().append("rect")
            .attr("class", "legend")
            .attr("fill", function (d) {
                return (d.color)
            })


    var textLegend = svg.selectAll(".legendtext")
            .data(Complegenddata)
            .enter().append("text")
            .attr("class", "legendtext")

            .text(function (d) {
                return d.Group
            })

    var titlelegend = svg.selectAll(".legendtitle")
            .data(["Complexity"])
            .enter().append("text")
            .attr("class", "legendtitle")
            .style("font-weight", "bold")
            .text("Complexity :")
    if ($(window).width() > 992) {

        legend
                .attr("x", function (d, i) {
                    return 0;
                })
                .attr("y", function (d, i) {
                    return 40 + i * 20;
                })
                .attr("width", 10)
                .attr("height", 20)

        textLegend.attr("x", function (d, i) {
            return 20;
        })
                .attr("y", function (d, i) {
                    return 55 + i * 20;
                })
        //.style("font-size", '14px')

        titlelegend.attr("x", 0)
                //.style("font-size", "14px")
                .attr("y", 15)
    } else {
        var ssift = 100;
        if ($(window).width() > 767) {
            ssift = 150;
        }
        var width = $('.graph-wrapper').width();
        legend
                .attr("width", width / 20)
                .attr("height", 10)
                .attr("x", function (d, i) {
                    return 0 + i * width / 20 + ssift;
                })
                .attr("y", function (d, i) {
                    return 10;
                })

        textLegend
                .attr("transform", function (d, i) {
                    return "translate(" + (i * width / 20 + (width / 2.5) / 20 + ssift) + ",28)rotate(35)";
                })





        titlelegend.attr("x", 5)

                .attr("y", 18)

    }
}

function UpdateChart() {
    $(document).on("change", "#selectionbar", function () {
        var jobs = $(window).width() > 992 ? '#jobs' : '#jobs2';
        var Parameter = $(window).width() > 992 ? '#parameters' : '#parameters2';
        var ColorSelection = $(window).width() > 992 ? "#color-selection" : "#color-selection2";
        var SelectedColor = $(ColorSelection).find('option:selected').val();
        var valueSelected = $(Parameter).find('option:selected').val();
        var chartContainerClass = ".graph-wrapper";
        var width = $('.graph-wrapper').width();
        var UpdateData = $("#selectionbar").find("option:selected").val();
        SwitchingChart();
        $.getJSON("json files/" + UpdateData + ".json", function (k, v) {
            format: "json"
        })
                .done(function (data) {
                    var mainData = data.nodes;
                    var chartData = jQuery.extend([], mainData)
                    console.log(chartData, UpdateData)
                    if (valueSelected == "prob") {
                        chartData.sort(function (m, n) {
                            return (m["p_auto"] - n["p_auto"])
                        })
                        $("#graph2").remove();
                        RenderChart(chartContainerClass, chartData, SelectedColor, valueSelected);
                        console.log($('#graph2'))
                        $('#graph2').css('display', 'block');
                        //Drawing chart and legend on the basis of skill color selection //
                    } else if (valueSelected == "comp") {
                        chartData.sort(function (m, n) {
                            return (m["complexity"] - n["complexity"])
                        })
                        $("#graph2").remove();
                        RenderChart(chartContainerClass, chartData, SelectedColor, valueSelected);
                        $('#graph2').css('display', 'block');
                    } else if (valueSelected == "job") {
                        $("#graph2").remove();
                        RenderChart(chartContainerClass, chartData, SelectedColor, valueSelected);
                        $('#graph2').css('display', 'block');
                    }

                })
    })

}

function RandomCategories(data) {
    $(document).on("click", ".random-selection", function () {
        var width = $('.graph-wrapper').width();
        // var svg = d3.select("#allplot3").append("svg")
        //     .attr("width", width)
        //     .attr("height", 180);
        var RandomData;
        var Parameter = $(window).width() > 992 ? '#parameters' : '#parameters2';
        var ColorSelection = $(window).width() > 992 ? "#color-selection" : "#color-selection2";
        var jobs = $(window).width() > 992 ? '#jobs' : '#jobs2';
        var categories = $(window).width() > 992 ? '#categories' : '#categories2'
        var Selectedcolor = $(ColorSelection).find('option:selected').val();
        var valueSelected = $(Parameter).find('option:selected').val();
        var chartContainerClass = ".graph-wrapper";
        var randomCategorieIndex = Math.floor(Math.random() * data.length)
        var randomCategorie = data[randomCategorieIndex]

        $("#selectionbar").val(randomCategorie.City_Code)
        $.getJSON("json files/" + randomCategorie.City_Code + ".json", function (k, v) {
            format: "json"
        })
                .done(function (data) {
                    RandomData = data.nodes;
                    $("#graph2").remove();
                    RenderChart(chartContainerClass, RandomData, Selectedcolor);
                    $('#graph2').css('display', 'block');
                    $('#cityname').text(data.city_name)
                            .attr("text-align", "left");
                })
                .done(function (data) {
                    RandomData = data.nodes;
                    $("#graph2").remove();
                    // RenderChart(chartContainerClass, RandomData, ColorOtion, OptionSelected);     ]]]]]]]]]]]]]]ch
                    if (valueSelected == "prob") {
                        RandomData.sort(function (m, n) {
                            return (m["p_auto"] - n["p_auto"])
                        })
                        $("#graph2").remove();
                        RenderChart(chartContainerClass, RandomData, Selectedcolor, valueSelected);
                        $('#graph2').css('display', 'block');
                        //Drawing chart and legend on the basis of skill color selection //
                    } else if (valueSelected == "comp") {
                        RandomData.sort(function (m, n) {
                            return (m["complexity"] - n["complexity"])
                        })
                        $("#graph2").remove();
                        RenderChart(chartContainerClass, RandomData, Selectedcolor, valueSelected);
                        $('#graph2').css('display', 'block');
                    } else if (valueSelected == "job") {
                        $("#graph2").remove();
                        RandomData.sort(function (a, b) {
                            return (a.group > b.group) ? 1 : ((b.group > a.group) ? -1 : 0);
                        });
                        RenderChart(chartContainerClass, RandomData, Selectedcolor, valueSelected);
                        $('#graph2').css('display', 'block');
                    }
                    $('#graph2').css('display', 'block');
                    $('#jobname').text(data.title)
                            .attr("text-align", "left");
                    $('#description').text(data.description)
                            .attr("text-align", "left");
                })
    })
}
/**  -------------------------------------------------------------------------   **/
/**
 * Method used to create by default legend
 *
 * @version   0.0.1
 * @since     0.0.1
 * @access    public
 * @author    
 */


function CityDefaultLegend() {
    var width = $('.main-wrapper').width() - 30;
    function getContainer() {
        if ($(window).width() > 500) {
            return ("#allplot3");
        }
        $('#allplot3').remove();
        return ('.main-wrapper');
    }

    var legendConatiner = getContainer();
    if (legendConatiner == ".main-wrapper") {
        var svg = d3.select(legendConatiner).append("svg")
                .attr("id", "svglegend")
                .attr("width", width)
                .attr("height", 80);
    } else {
        var svg = d3.select(legendConatiner).append("svg")
                .attr("id", "svglegend")
                .attr("width", width)
                .attr("height", 185);
    }
    var legenddata = [{
            "Group": "skills",
            "color": "#f9b29c"
        }, {
            "Group": "abilities",
            "color": "#fccfce"
        }, {
            "Group": "knowledge",
            "color": "#d3e3c4"
        }, {
            "Group": "interest",
            "color": " #908995"
        }, {
            "Group": "work activity",
            "color": " #92c2c2"
        }, {
            "Group": "work style",
            "color": " #fff0a6"
        }, {
            "Group": "work value",
            "color": "#ffc04c"
        }, {
            "Group": "work context",
            "color": "#d963a0"
        }]
    var legend = svg.selectAll(".legend")
            .data(legenddata)
            .enter().append("rect")
            .attr("class", "legend")
            .attr("fill", function (d) {
                return d.color
            })


    var textLegend = svg.selectAll(".legendtext")
            .data(legenddata)
            .enter().append("text")
            .attr("class", "legendtext")

            .text(function (d) {
                return d.Group
            })

    var titlelegend = svg.selectAll(".legendtitle")
            .data(["Job Component"])
            .enter().append("text")
            .attr("class", "legendtitle")
            .style("font-weight", "bold")
            .text("Job Component :")

    ////////////////////////////////////////////////////////
    if ($(window).width() > 992) {

        legend
                .attr("x", function (d, i) {
                    return 0;
                })
                .attr("y", function (d, i) {
                    return 30 + i * 20;
                })
                .attr("width", 10)
                .attr("height", 30)

        textLegend.attr("x", function (d, i) {
            return 20;
        })
                .attr("y", function (d, i) {
                    return 45 + i * 20;
                })


        titlelegend.attr("x", 0)
                .attr("y", 15)


    } else {
        var ssift = 100
        if ($(window).width() > 767) {
            ssift = 150

        }
        legend
                .attr("width", width / 20)
                .attr("height", 10)
                .attr("x", function (d, i) {
                    return 0 + i * width / 20 + ssift;
                })
                .attr("y", function (d, i) {
                    return 10;
                })

        textLegend
                .attr("transform", function (d, i) {
                    return "translate(" + (i * width / 20 + (width / 2.5) / 20 + ssift) + ",28)rotate(35)";
                })





        titlelegend.attr("x", 5)

                .attr("y", 18)
    }
    ///////////////////////////////////////////////////////////////////

}
function SearchJobs(data) {
    var tags = $(window).width() > 992 ? '#tags' : '#tags2';
    var jobList = {}
    for (j = 0; j < data.length; j++) {
        var item = data[j]
        jobList[item.AREA_NAME] = item.City_Code
    }
    $(tags).autocomplete({
        source: Object.keys(jobList),
    })
    $(tags).on('autocompleteselect', function (e, i) {
        var Parameter = $(window).width() > 992 ? '#parameters' : '#parameters2';
        var ColorSelection = $(window).width() > 992 ? "#color-selection" : "#color-selection2";
        var Selectedcolor = $(ColorSelection).find('option:selected').val();
        var valueSelected = $(Parameter).find('option:selected').val();
        var chartContainerClass = ".graph-wrapper";
        d3.json("json files/" + jobList[i.item.value] + ".json", function (error, graph) {
            var SearchData = graph.nodes;
            var chartData = jQuery.extend([], SearchData)
            if (valueSelected == "job") {
                if (on == 0) {
                    var ColorOtion = $(ColorSelection + " " + "option[value=prob]").attr('selected', true);
                    var SelectedColor = $(ColorOtion).val();
                    if (SelectedColor) {
                        SelectedColor = $(ColorSelection).find('option:selected').val();
                    }
                } else {
                    SelectedColor = $(ColorSelection).find('option:selected').val();
                }
                $("#graph2").remove();
                console.log(SelectedColor)
                RenderChart(chartContainerClass, chartData, SelectedColor, valueSelected);
                $('#graph2').css('display', 'block');
            } else if (valueSelected == "prob") {
                chartData.sort(function (m, n) {
                    return (m["p_auto"] - n["p_auto"])
                })
                if (on == 0) {
                    var ColorOtion = $(ColorSelection + " " + "option[value=prob]").attr('selected', true);
                    var SelectedColor = $(ColorOtion).val();
                    if (SelectedColor) {
                        SelectedColor = $(ColorSelection).find('option:selected').val();
                    }
                } else {
                    SelectedColor = $(ColorSelection).find('option:selected').val();
                }
                $("#graph2").remove();
                RenderChart(chartContainerClass, chartData, SelectedColor, valueSelected);
                $('#graph2').css('display', 'block');
//Drawing chart and legend on the basis of skill color selection //
            } else if (valueSelected == "comp") {
//                        chartData = mainData;
                chartData.sort(function (m, n) {
                    return (m["complexity"] - n["complexity"])
                })
                if (on == 0) {
                    var ColorOtion = $(ColorSelection + " " + "option[value=prob]").attr('selected', true);
                    var SelectedColor = $(ColorOtion).val();
                    if (SelectedColor) {
                        SelectedColor = $(ColorSelection).find('option:selected').val();
                    }
                } else {
                    SelectedColor = $(ColorSelection).find('option:selected').val();
                }
//                        console.log(chartData)
                $("#graph2").remove();
                RenderChart(chartContainerClass, chartData, SelectedColor, valueSelected);
                $('#graph2').css('display', 'block');
            }


        });
    })
}


