all: us_congress_current.yaml us_congress_offices.yaml us_districts.csv us_governors.csv

clean:
	rm -rf -- *.csv *.yaml

us_congress_current.yaml :
	curl -k "https://raw.githubusercontent.com/unitedstates/congress-legislators/master/legislators-current.yaml" -o "us_congress_current.yaml"

us_congress_offices.yaml:
	curl -k "https://raw.githubusercontent.com/TheWalkers/congress-legislators/master/legislators-district-offices.yaml" -o "us_congress_offices.yaml"

us_districts.csv:
	curl -k "https://raw.githubusercontent.com/spacedogXYZ/us_zipcodes_congress/master/zccd.csv" -o "us_districts.csv"

us_congress_committees.yaml:
	curl -k "https://raw.githubusercontent.com/unitedstates/congress-legislators/master/committees-current.yaml" -o "us_congress_committees.yaml"

us_congress_committees_membership.yaml:
	curl -k "https://raw.githubusercontent.com/unitedstates/congress-legislators/master/committee-membership-current.yaml" -o "us_congress_committees_membership.yaml"

us_governors.csv:
	curl -k "https://raw.githubusercontent.com/spacedogXYZ/us_governors_contact/master/data.csv" -o "us_governors.csv"

ca_house_of_commons.csv:
	curl -k "http://represent.opennorth.ca.s3.amazonaws.com/csv/representatives/house-of-commons.csv" -o "ca_house_of_commons.csv"