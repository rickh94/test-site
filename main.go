package main

import (
	"fmt"
	"os"

	airtable "github.com/fabioberger/airtable-go"
)

type result struct {
	AirtableID string `json:"id,omitempty"`
	Fields     struct {
		Email string
		Choice int
	} `json:"fields"`
}

func main() {
	airtableAPIKey := os.Getenv("AIRTABLE_API_KEY")
	baseID := os.Getenv("AIRTABLE_BASE_ID")

	client, err := airtable.New(airtableAPIKey, baseID)
	if err != nil {
		fmt.Printf("Could not connect to Airtable %v\n", err)
		os.Exit(1)
	}


	firstResult := result{}
	firstResult.Fields.Choice = 1
	firstResult.Fields.Email = "test@example.com"

	err = client.CreateRecord("Results", &firstResult)

	if err != nil {
		fmt.Printf("The record could not be created %v\n", err)
		os.Exit(1)
	} else {
		fmt.Printf("The record was created %s\n", firstResult.AirtableID)
	}

}
