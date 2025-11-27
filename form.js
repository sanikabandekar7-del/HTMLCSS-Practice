document.getElementById("regForm").addEventListener("submit", function(e) {
            e.preventDefault();
            document.getElementById("successMsg").style.display = "block";

            setTimeout(() => {
                document.getElementById("successMsg").style.display = "none";
                document.getElementById("regForm").reset();
            }, 2500);
        });