$(document).ready(function(){
    $('#load_data').click(function(){  //define the function of the load_data button
        $.ajax({
            url:data_url, //change url to data file
            dataType:"text",
            success:function(data)
            {
                //all data
                var csv_data = data.split(/\r?\n|\r/);

                //initialize variable to store HC and LC chain info
                var seq_data='';

                // table start syntax
                var germline_data='<table class="table table-striped">';    //germline table data
                var biophysics_data='<table class="table table-striped">';  //biophysics table data
                var batch_data='<table class="table table-striped">';       //batch production data


                // count = row. Iterate through each row
                for(var count = 0; count<csv_data.length; count++)
                {
                    //cell_data = data of each row
                    var cell_data = csv_data[count].split(",");

                    //add row syntax for each table
                    germline_data += '<tr>';
                    biophysics_data+= '<tr>';
                    batch_data+= '<tr>';

                    //cell_count = column. Iterate through each column for the current row
                    for(var cell_count=0; cell_count<cell_data.length; cell_count++)
                    {
                        if(count === 0)  //header
                        {
                            //protein ID header
                            if (cell_count==0){
                                germline_data+='<th>'+cell_data[cell_count]+'</th>';
                                biophysics_data+='<th>'+cell_data[cell_count]+'</th>';
                                batch_data+='<th>'+cell_data[cell_count]+'</th>';
                            }

                            //skip HC, HL
                            else if (cell_count == 1 | cell_count == 2){
                            }

                            //germlilne header
                            else if (cell_count >=3 & cell_count <=9 ) {
                                germline_data+='<th>'+cell_data[cell_count]+'</th>';
                            }

                            //biophysics header
                            else if (cell_count>=10 & cell_count<=12){
                                biophysics_data+='<th>'+cell_data[cell_count]+'</th>';
                            }

                            //production header
                            else {
                                batch_data += '<th>'+cell_data[cell_count]+'</th>';
                            }
                        }

                        else  //not header
                        {
                            //protein ID data
                            if (cell_count==0){

                                //add ID header to sequence
                                seq_data+='<h1 align="left">'+cell_data[cell_count]+'</h1>';
                                // seq_data+='<h2 align="left">Protein ID: '+cell_data[cell_count]+'</h2>';
                                // change back if you have multiple seqs

                                //add ID header to all tables
                                germline_data+='<th>'+cell_data[cell_count]+'</th>';
                                biophysics_data+='<th>'+cell_data[cell_count]+'</th>';
                                batch_data+='<th>'+cell_data[cell_count]+'</th>';
                            }

                            //column with HC seq
                            else if (cell_count==1) {
                                seq_data+='<h3 align="left">H-Chain</h3>';
                                seq_data+='<p class="fasta">'+cell_data[cell_count]+'</p>';

                            }

                            //column with LC seq
                            else if (cell_count==2){   //column with LC seq
                                seq_data+='<h3 align="left">L-Chain</h3>';
                                seq_data+='<p class="fasta">'+cell_data[cell_count]+'</p>';

                            }

                            //germline data
                            else if (cell_count >=3 & cell_count <=9 ) {
                                germline_data+='<td>'+cell_data[cell_count]+'</td>';
                            }

                            //biophysics data
                            else if (cell_count>=10 & cell_count<=12){
                                biophysics_data+='<td>'+cell_data[cell_count]+'</td>';
                            }

                            //production data
                            else {
                                batch_data += '<td>'+cell_data[cell_count]+'</td>';
                            }
                        }
                    }

                    //add the row end syntax <tr>
                    germline_data += '</tr>';
                    biophysics_data+= '</tr>';
                    batch_data+= '</tr>';
                }

                //End of csv iteration. add table end syntax

                germline_data += '</table>';
                biophysics_data+= '</table>';
                batch_data+= '</table>';

                //create html for the sequences and tables
                $('#protein_seq').html(seq_data);
                $('#germline_table').html(germline_data);
                $('#biophysics_table').html(biophysics_data);
                $('#batch_table').html(batch_data);
            }
        });
    });

});